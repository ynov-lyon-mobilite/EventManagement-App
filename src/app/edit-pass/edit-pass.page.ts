import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import {NgForm} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router';

const CHANGEPASS = gql`
mutation changePassowrd ($newPassword: String!, $oldPassword: String!){
  changePassword(newPassword: $newPassword oldPassword: $oldPassword)
}
`;

@Component({
  selector: 'app-edit-pass.page',
  templateUrl: './edit-pass.page.html',
  styleUrls: ['./edit-pass.page.scss'],
})
export class EditPassPage implements OnInit {

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
  ngOnInit() {}

  onSubmit(formEditPass: NgForm){
    //change password
    if(formEditPass.value.oldPassword){
      if (formEditPass.value.newPassword == formEditPass.value.confirmPassword){  
        this.apollo.mutate({
          mutation: CHANGEPASS,
          variables: {
            oldPassword: formEditPass.value.oldPassword,
            newPassword: formEditPass.value.newPassword
          }
        }).subscribe(({ data }) => {
          this.router.navigate(['/tablinks/home']);
          this.openToastSuccess("Le mot de passe a bien été modifié");
        },(error) => {
          try {
            let jsonMsg = JSON.parse(error.message);
            let errorMsg = jsonMsg[0].message;
            this.openToast(errorMsg);
          } catch (e) {
            this.openToast(error.message);          
          }
        });
      } else {
        this.openToast("Les mots de passe ne sont pas les mêmes");  
      }  
    }
  }
} 
