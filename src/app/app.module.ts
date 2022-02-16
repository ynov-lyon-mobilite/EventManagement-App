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
import { createApollo, GraphQLModule } from './graphql.module';
// import { GoogleMapsModule } from '@angular/google-maps';

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
    // GoogleMapsModule
],
  providers: [
        {
          provide: RouteReuseStrategy,
          useClass: IonicRouteStrategy
        },
        {
          provide: APOLLO_OPTIONS,
          useFactory: createApollo,
          deps: [HttpLink]
      }],
  bootstrap: [AppComponent],
})

@NgModule({
  imports: [BrowserModule],
  providers: [

  ],
})
export class AppModule {}
