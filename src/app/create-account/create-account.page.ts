import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

const createAccount = gql`
  mutation Login ($email: String!, $password: String!, $displayName: String!){
    register(email: $email password: $password displayName: $displayName){
      jwt
      user{
        displayName
      }
    }
  }
`;

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})

export class CreateAccountPage implements OnInit {
  constructor(private apollo: Apollo, private router: Router, public toastCtrl: ToastController) {}
  ngOnInit(){}

  async openToast(errorMsg) {
    const toast = await this.toastCtrl.create({
         message: errorMsg,
         position: "top",
         duration: 2000,
         color: "danger"
    });
    toast.present();
  }
  onSubmit(formCreateAccount: NgForm){
      this.apollo.mutate({
        mutation: createAccount,
        variables: {
          email: formCreateAccount.value.email,
          password: formCreateAccount.value.password,
          displayName: formCreateAccount.value.displayName
        }
      }).subscribe(({ data }) => {
        this.router.navigate(['/tablinks/login']);
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
