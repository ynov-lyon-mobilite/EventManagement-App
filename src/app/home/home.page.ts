import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { withModule } from '@angular/core/testing';

// const GET_EVENTS = gql`
//   query GetEvent {
//     events(page: 1, includePastEvents: true) {
//       pageInfo {
//         totalPages
//       }
//       edges {
//         node {
//           uuid
//           title
//           startDate
//           endDate
//           description
//           participantsCount
//           restPlaces
//         }
//       }
//     }
//   }
// `;
const GET_EVENTS = gql`
  query Event($event: String!) {
    event(uuid: $event) {
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
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Events = [];

  loading: boolean;
  event: any;
  paramSubscription: Subscription;
  querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
    this.Events = [
      {
        name: 'Gratuit',
        location: '30 Av. Berthelot, 69007 Lyon',
        date: '17 janvier 2022',
        time: '18h',
        source: '../../assets/images/glasses-alcool.jpg',
      },
      {
        name: 'Kolok',
        location: '30 Av. Berthelot, 69007 Lyon',
        date: '20 février 2022',
        time: '18h',
        source: '../../assets/images/la-kolok-lyon.png',
      },
    ];
  }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe((params) => {
      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: GET_EVENTS,
          variables: { event: 'ba884999-2fa1-450f-809c-1bf7ac48b724' },
        })
        .valueChanges.subscribe(({ data, loading }) => {
          this.loading = loading;
          // const events = { ...data.events.edges };
          const events = { ...data.event };
          console.log(events);
          // console.log(events[0].node.uuid);
          // for (let i = 0; i < events.length; i++) {
          //   console.log(events[i].node);
          // }
          let i = 0;
          while (events[i].node) {
            // console.log(events[i].node.uuid);
            let date = new Date(events.startDate);
            events.date = date.toLocaleDateString();
            events.time = date.toLocaleTimeString().substring(0, 5);
            this.event = events;
            i++;
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
