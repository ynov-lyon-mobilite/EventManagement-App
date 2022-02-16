import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {Apollo, gql} from 'apollo-angular';

const PROFIL = gql`
query user_infos {
  user_infos {
    uuid,
    displayName
  }
}
`;
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  
  displayName : any
  paramSubscription:Subscription 
  querySubscription:Subscription 

  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.querySubscription = this.apollo.watchQuery<any>({
        query: PROFIL,
      })
        .valueChanges
        .subscribe(({ data }) => {
          if (data){
            this.displayName = data.user_infos.displayName;
          } else {
            this.displayName = "Pas de profil"
          }
        });
      })
    }
}