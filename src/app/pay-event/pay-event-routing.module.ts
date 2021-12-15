import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayEventPage } from './pay-event.page';

const routes: Routes = [
  {
    path: '',
    component: PayEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayEventPageRoutingModule {}
