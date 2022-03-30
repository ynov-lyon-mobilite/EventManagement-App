import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {Router} from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Token } from 'graphql';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

//Query pour recupérer un evenement
const GET_EVENT = gql` 
query Event ($event: String!) {
  event (uuid:$event) {
    title
    description
    startDate
    endDate
    participantsCount
    restPlaces
    image
    prices {
      amount
      description
      uuid
    }
    participants {
      edges {
        node {
           uuid
        }
      }
    }
  }
}
`;


const REGISTER_EVENT = gql`
mutation createBooking($eventUuid: String!) {
  createBooking(eventPriceUuid: $eventUuid) {
    user {
      displayName
    }
  }
}
`;


const PROFIL = gql`
query user_infos {
  user_infos {
    uuid,
    displayName
  }
}
`;


@Component({
  selector: 'app-free-event',
  templateUrl: './free-event.page.html',
  styleUrls: ['./free-event.page.scss'],
})


export class FreeEventPage implements OnInit,OnDestroy {
  textButtonRegister:string

  eventUuid: string;
  loading: boolean;
  event: any;
  userId : string;
  
  paramSubscription:Subscription 
  querySubscription:Subscription 
  
  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router, public toastCtrl: ToastController,public alertController: AlertController) { }
  
  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.querySubscription = this.apollo.watchQuery<any>({
        query: GET_EVENT,
        variables:{event:params.uuid}
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;
          const event = {...data.event}
          this.eventUuid = event.prices[0].uuid;
          this.whatMessage(event.prices[0].amount);
          

          if (event) {
            let date = new Date(event.startDate);
            event.date = date.toLocaleDateString()
            event.time = date.toLocaleTimeString().substring(0,5);
            this.event = event;
          }

        });
      })
      this.getUser();
  }

  async openToastError(errorMsg) {
    const toast = await this.toastCtrl.create({
         message: errorMsg,
         position: "top",
         duration: 2000,  
         color: "danger"
    });
    toast.present();
  }

  async openToastSuccess(errorMsg) {
    const toast = await this.toastCtrl.create({
         message: errorMsg,
         position: "top",
         duration: 2000,
         color: "success"
    });
    toast.present();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',

      message: 'Voulez vous vraiment vous inscrire à cette évenement?.',
      buttons: [
        {
          text: 'Annulé',
        }, {
          text: "S'inscrire",
          handler: () => {
             this.onSubmit();
          }
        }
      ]
    });

    await alert.present();
  }

  getUser() {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.querySubscription = this.apollo.watchQuery<any>({
        query: PROFIL,
      })
        .valueChanges
        .subscribe(({ data }) => {
          if (data){
            const user = {...data.user_infos}
            this.userId = user.uuid;
          }
        });
      })
  }

  checkParticipants() {
    for(let i = 0; i < this.event.participantsCount; i++) {
      if (this.userId == this.event.participants.edges[i].node.uuid) {
        return false;
      }
    }
      return true
  }

  onSubmit() {
    const token = localStorage.getItem('token');

    if (!this.checkParticipants()) {
      this.openToastError("Vous vous êtes déjà inscrit :)");
    } else {
      if (token) {
        this.apollo.mutate({
          mutation: REGISTER_EVENT,
          variables: {
            eventUuid: this.eventUuid
          }
      }).subscribe(({data}) => {
        const res: any = data;
        this.openToastSuccess("Votre inscription à bien été réservé");
        this.router.navigate(['/tablinks/home']);
      },(error) => {
        try {
          let jsonMsg = JSON.parse(error.message);
          let errorMsg = jsonMsg[0].message;
          this.openToastError(errorMsg);
        } catch (e) {
          this.openToastError(error.message);          
        }
        
      })
    }
  }
    
  }

  whatMessage(price) {
    if (Number(price) <= 0) {
        this.textButtonRegister = `Je participe (Gratuit)`;
    } else {
        this.textButtonRegister = `Je reserve la place : ${price}€`;
    }
  }
  
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
  }

}
