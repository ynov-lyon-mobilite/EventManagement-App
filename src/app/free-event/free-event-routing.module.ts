import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreeEventPage } from './free-event.page';

const routes: Routes = [
  {
    path: '',
    component: FreeEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeEventPageRoutingModule {}
