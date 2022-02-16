import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import { Token } from 'graphql';

const editProfil = gql`
query user () {
  editProfil (email: $email) {
    email
  }
}
`;

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.page.html',
  styleUrls: ['./edit-profil.page.scss'],
})
export class EditProfilPage implements OnInit {

  loading: boolean;
  editProfil: any;
 
  paramSubscription:Subscription 
  querySubscription:Subscription 
  
  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.querySubscription = this.apollo.watchQuery<any>({
        query: editProfil,
        variables:{event:params.uuid}
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;

          if (editProfil) {
          }

        });
      })

    }
  }
