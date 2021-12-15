import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreeEventPageRoutingModule } from './free-event-routing.module';

import { FreeEventPage } from './free-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreeEventPageRoutingModule
  ],
  declarations: [FreeEventPage]
})
export class FreeEventPageModule {}
