import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {Router} from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { element } from 'protractor';

//Query pour récupérer les events auquel l'user participe
const GET_USER_EVENT = gql `
query user_infos {
  user_infos {
    joinedEvents {
      title,
      image,
      description,
      startDate,
      endDate
    }
  }
}
`
@Component({
  selector: 'app-yvent-page',
  templateUrl: './yvent-page.page.html',
  styleUrls: ['./yvent-page.page.scss'],
})
export class YventPagePage implements OnInit {
  
  paramSubscription:Subscription 
  querySubscription:Subscription 
  eventsList = [];
  eventStartDate: any;

  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router, public toastCtrl: ToastController,public alertController: AlertController) {}


  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.querySubscription = this.apollo.watchQuery<any>({
        query: GET_USER_EVENT,
      })
        .valueChanges
        .subscribe(({ data }) => {
          this.eventsList = data.user_infos.joinedEvents;
          this.eventStartDate = new Date(data.user_infos.joinedEvents.startDate);
          this.eventStartDate = this.eventStartDate.toLocaleDateString();
        });
    });
  }
}