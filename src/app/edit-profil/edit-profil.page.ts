import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import {NgForm} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router';

const EDITPROFIL = gql`
query user_infos {
  user_infos {
    uuid,
    displayName,
    email,
    roles,
  }
}
`;

const UPDATEUSER = gql`
mutation updateUser ($displayName: String!, $email: String!, $uuid: String!){
  updateUser(displayName: $displayName, email: $email, uuid: $uuid ){
    displayName
  }
}
`;

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.page.html',
  styleUrls: ['./edit-profil.page.scss'],
})
export class EditProfilPage implements OnInit {

  displayName: string;
  email: string;
  userId: string;

  paramSubscription:Subscription 
  querySubscription:Subscription 
  
  constructor(private route: ActivatedRoute, private apollo: Apollo, public toastCtrl: ToastController, private router: Router) { }

  async openToast(errorMsg) {
    const toast = await this.toastCtrl.create({
         message: errorMsg,
         position: "top",
         duration: 2000,
         color: "danger"
    });
    toast.present();
  }
  async openToastSuccess(successMsg) {
    const toast = await this.toastCtrl.create({
      message: successMsg,
      position: "top",
      duration: 2000,
      color: "success"
    });
    toast.present();
  }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.querySubscription = this.apollo.watchQuery<any>({
        query: EDITPROFIL,
      })
        .valueChanges
        .subscribe(({ data }) => {
          if (data){
            this.displayName = data.user_infos.displayName;
            this.email = data.user_infos.email;
            this.userId = data.user_infos.uuid;
           } else {
            this.displayName = "Pas de profil"
          }
        });
      })
    }

    onSubmit(formEditProfil: NgForm){
      //edit user
      if(formEditProfil.value.displayName) {
        if(this.displayName != formEditProfil.value.displayName) {
          this.displayName = formEditProfil.value.displayName;
          this.email = formEditProfil.value.email;
          this.apollo.mutate({
            mutation: UPDATEUSER,
            variables: {
              displayName: this.displayName,
              email: this.email,
              uuid: this.userId,
            }
          }).subscribe(({ data }) => {
            this.router.navigate(['/tablinks/home']);
            this.openToastSuccess("Le profil a bien été modifié");
          },(error) => {
            try {
              let jsonMsg = JSON.parse(error.message);
              let errorMsg = jsonMsg[0].message;
              this.openToast(errorMsg);
            } catch (e) {
              this.openToast(error.message);          
            }
          });
        }
      }
    }
  }
