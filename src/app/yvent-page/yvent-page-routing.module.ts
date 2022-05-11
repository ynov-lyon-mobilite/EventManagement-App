import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YventPagePage } from './yvent-page.page';

const routes: Routes = [
  {
    path: '',
    component: YventPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YventPagePageRoutingModule {}
