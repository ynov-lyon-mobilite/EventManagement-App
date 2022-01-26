import { Component, OnInit } from '@angular/core';

import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   constructor(private apollo: Apollo) {}

   ngOnInit(){
    console.log(this.apollo);
   }

}
