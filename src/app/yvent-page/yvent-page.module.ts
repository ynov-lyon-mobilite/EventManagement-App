import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YventPagePageRoutingModule } from './yvent-page-routing.module';

import { YventPagePage } from './yvent-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YventPagePageRoutingModule
  ],
  declarations: [YventPagePage]
})
export class YventPagePageModule {}
