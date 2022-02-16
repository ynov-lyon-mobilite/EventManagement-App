import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';


const GET_EVENT = gql`
query Event ($event: String!) {
  event (uuid:$event) {
    title
    description
    startDate
    endDate
    participantsCount
    restPlaces
  }
}
`;

@Component({
  selector: 'app-free-event',
  templateUrl: './free-event.page.html',
  styleUrls: ['./free-event.page.scss'],
})


export class FreeEventPage implements OnInit,OnDestroy {
  loading: boolean;
  event: any;

  paramSubscription:Subscription 
  querySubscription:Subscription 
  
  constructor(private route: ActivatedRoute, private apollo: Apollo) { }
  
  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.querySubscription = this.apollo.watchQuery<any>({
        query: GET_EVENT,
        variables:{event:params.uuid}
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;
          const event = {...data.event}

          if (event) {
            let date = new Date(event.startDate);
            event.date = date.toLocaleDateString()
            event.time = date.toLocaleTimeString().substring(0,5);
            this.event = event;
          }

        });
      })

      
   
  }
  
  
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
  }

}
