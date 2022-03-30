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
  query GetEvent {
    events(page: 1, take: 20, includePastEvents: true) {
      pageInfo {
        totalPages
      }
      edges {
        node {
          title
          startDate
          endDate
          description
          participantsCount
          nbPlaces
          image
          restPlaces
          prices {
            uuid
          }
          uuid
        }
      }
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
  // event: any;
  paramSubscription: Subscription;
  querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
    this.Events = [];
  }

  ngOnInit() {
    //retrieve all events from api, copies it in the temporary array 'allEvents' and fill 'this.Events' with all needed information in the right format
    this.paramSubscription = this.route.params.subscribe((params) => {
      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: GET_EVENTS,
        })
        .valueChanges.subscribe(({ data, loading }) => {
          this.loading = loading;
          let allEvents = data.events.edges;
          allEvents.forEach((element) => {
            let node = element.node;
            let entries = Object.entries(node);
            let event = {};
            entries.forEach((entry) => {
              event[entry[0]] = entry[1];
              let formattedDate = new Date(event['startDate']);
              event['formattedDate'] = formattedDate.toLocaleDateString();
              event['formattedTime'] = formattedDate
                .toLocaleTimeString()
                .substring(0, 5);
            });
            this.Events.push(event);
          });
        });
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
