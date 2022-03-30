import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPassPageRoutingModule } from './edit-pass-routing.module';

import { EditPassPage } from './edit-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPassPageRoutingModule
  ],
  declarations: [EditPassPage]
})
export class EditPassPageModule {}
