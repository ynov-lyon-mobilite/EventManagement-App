import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import {} from 'googlemaps';

import { IonicModule } from '@ionic/angular';

import { FreeEventPageRoutingModule } from './event-routing.module';

import { FreeEventPage } from './event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreeEventPageRoutingModule
  ],
  declarations: [FreeEventPage]
})
export class FreeEventPageModule {
}
