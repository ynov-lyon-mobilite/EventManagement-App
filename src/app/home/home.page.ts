import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';

export var EVENTS = [];

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
          participants {
            edges {
              node {
                displayName
                uuid
              }
            }
          }
          nbPlaces
          image
          restPlaces
          prices {
            uuid
            amount
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
  events = [];
  loading: boolean;
  paramSubscription: Subscription;
  querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
    //retrieve all events from api, copies it in the temporary array 'allEvents' and fill 'this.Events' with all needed information in the right format
    this.paramSubscription = this.route.params.subscribe((params) => {
      EVENTS = [];
      this.events = [];
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
            EVENTS.push(event);
            this.events = EVENTS;
          });
        });
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  filterSearch(filter: string) {
    let filteredEvents = [];
    EVENTS.forEach((event) => {
      if (
        event.description?.localeCompare(filter, 'fr', {
          sensitivity: 'base',
        }) === 0 ||
        event.title?.localeCompare(filter, 'fr', { sensitivity: 'base' }) ===
          0 ||
        event.description?.includes(filter) ||
        event.title?.includes(filter)
      ) {
        filteredEvents.push(event);
      }
    });
    this.events = filteredEvents;
  }
}
