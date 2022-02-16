import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {Apollo, gql} from 'apollo-angular';

const EDITPROFIL = gql`
query user_infos {
  user_infos {
    uuid,
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

  displayName: any;
 
  paramSubscription:Subscription 
  querySubscription:Subscription 
  
  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.querySubscription = this.apollo.watchQuery<any>({
        query: EDITPROFIL,
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
