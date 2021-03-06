import { Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

const LOGIN = gql`
  mutation Login ($email: String!, $password: String!){
    login(email: $email password: $password){
      jwt
      user{
        displayName
      }
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit{

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
  onSubmit(formLogin: NgForm){
      this.apollo.mutate({
        mutation: LOGIN,
        variables: {
          email: formLogin.value.email,
          password: formLogin.value.password
        }
      }).subscribe(({ data }) => {
        const res: any = data;
        localStorage.setItem("token", res.login.jwt);
        this.router.navigate(['/tablinks/home']);
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
