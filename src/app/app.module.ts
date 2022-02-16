import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { GoogleMapsModule } from '@angular/google-maps';

// import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserModule, 
    GoogleMapsModule
],
  providers: [
        {
          provide: RouteReuseStrategy,
          useClass: IonicRouteStrategy
        },
        {
          provide: APOLLO_OPTIONS,
          useFactory: (httpLink: HttpLink) => {
            return {
              cache: new InMemoryCache(),
              link: httpLink.create({
                uri: 'https://yvent-api.herokuapp.com/api/graphql',
              }),
            };
          },
          deps: [HttpLink],
      }],
  bootstrap: [AppComponent],
})

@NgModule({
  imports: [BrowserModule, ],
  providers: [

  ],
})
export class AppModule {}
