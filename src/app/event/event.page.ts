import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Token } from 'graphql';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EVENTS } from '../home/home.page';
import { EmbeddedTemplateAst } from '@angular/compiler';

const PAY_EVENT = gql`
  mutation joinEvent($event: String!, $eventUuid: String!) {
    joinEvent(
      cancelUrl: "https://google.com"
      eventUuid: $event
      priceUuid: $eventUuid
      successUrl: "https://google.com"
    )
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
      uuid
      displayName
    }
  }
`;

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class FreeEventPage implements OnInit, OnDestroy {
  isPay = false;
  isError = false;
  textButtonRegister: string;
  eventUuid: string;
  loading: boolean;
  event: any;
  userId: string;
  urlPay: any;

  paramSubscription: Subscription;
  querySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private router: Router,
    public toastCtrl: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    // console.log(EVENTS);
    this.eventUuid = this.route.snapshot.paramMap.get('uuid');
    // console.log(this.eventUuid);
    this.event = EVENTS.find((event) => event.uuid == this.eventUuid);
    console.log(this.event);
    this.whatMessage(this.event.prices[0].amount);
    this.getUser();
  }

  async openToastError(errorMsg) {
    const toast = await this.toastCtrl.create({
      message: errorMsg,
      position: 'top',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  async openToastSuccess(errorMsg) {
    const toast = await this.toastCtrl.create({
      message: errorMsg,
      position: 'top',
      duration: 2000,
      color: 'success',
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
          text: 'Annuler',
        },
        {
          text: "S'inscrire",
          handler: () => {
            this.onSubmit();
          },
        },
      ],
    });

    await alert.present();
  }

  getUser() {
    this.paramSubscription = this.route.params.subscribe((params) => {
      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: PROFIL,
        })
        .valueChanges.subscribe(({ data }) => {
          if (data) {
            const user = { ...data.user_infos };
            this.userId = user.uuid;
          }
        });
    });
  }

  checkParticipants() {
    for (let i = 0; i < this.event.participantsCount; i++) {
      if (this.userId == this.event.participants.edges[i].node.uuid) {
        return false;
      }
    }
    return true;
  }

  onSubmit() {
    const token = localStorage.getItem('token');

    if (!this.checkParticipants()) {
      this.openToastError('Vous vous êtes déjà inscrit :)');
    } else {
      if (this.isPay) {
        try {
          this.apollo
            .mutate({
              mutation: PAY_EVENT,
              variables: {
                event: this.event.uuid,
                eventUuid: this.eventUuid,
              },
            })
            .subscribe(
              ({ data }) => {
                const res = data;
                window.location.href = res['joinEvent'];
              },
              (error) => {
                try {
                  let jsonMsg = JSON.parse(error.message);
                  let errorMsg = jsonMsg[0].message;
                  this.openToastError(errorMsg);
                } catch (e) {
                  this.isError = true;
                  this.openToastError(error.message);
                }
              }
            );
        } catch (error) {
          this.isError = true;
          this.openToastError(error.message);
        }
      }

      if (token && this.isError == false) {
        this.apollo
          .mutate({
            mutation: REGISTER_EVENT,
            variables: {
              eventUuid: this.eventUuid,
            },
          })
          .subscribe(
            ({ data }) => {
              const res: any = data;
              this.openToastSuccess('Votre inscription à bien été réservé');
              this.router.navigate(['/tablinks/home']);
            },
            (error) => {
              try {
                let jsonMsg = JSON.parse(error.message);
                let errorMsg = jsonMsg[0].message;
                this.openToastError(errorMsg);
              } catch (e) {
                this.openToastError(error.message);
              }
            }
          );
      }
    }
  }

  whatMessage(price) {
    if (Number(price) <= 0) {
      this.textButtonRegister = `Je participe (Gratuit)`;
    } else {
      this.isPay = true;
      this.textButtonRegister = `Je reserve la place : ${price}€`;
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
