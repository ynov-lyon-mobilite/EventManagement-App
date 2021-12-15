import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayEventPageRoutingModule } from './pay-event-routing.module';

import { PayEventPage } from './pay-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayEventPageRoutingModule
  ],
  declarations: [PayEventPage]
})
export class PayEventPageModule {}
