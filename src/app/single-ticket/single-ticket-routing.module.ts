import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleTicketPage } from './single-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: SingleTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleTicketPageRoutingModule {}
