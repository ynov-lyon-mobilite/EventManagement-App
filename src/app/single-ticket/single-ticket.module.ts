import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleTicketPageRoutingModule } from './single-ticket-routing.module';

import { SingleTicketPage } from './single-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleTicketPageRoutingModule
  ],
  declarations: [SingleTicketPage]
})
export class SingleTicketPageModule {}
