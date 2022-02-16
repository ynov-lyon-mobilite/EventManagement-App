import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tablinks',
    pathMatch: 'full'
  }, 
  {
    path: 'free-event',
    loadChildren: () => import('./free-event/free-event.module').then( m => m.FreeEventPageModule)
  },
  {
    path: 'pay-event',
    loadChildren: () => import('./pay-event/pay-event.module').then( m => m.PayEventPageModule)
  },
  {
    path: 'single-ticket',
    loadChildren: () => import('./single-ticket/single-ticket.module').then( m => m.SingleTicketPageModule)
  },
  {
    path: 'edit-profil',
    loadChildren: () => import('./edit-profil/edit-profil.module').then( m => m.EditProfilPageModule)
  },
  {
    path: 'tablinks',
    loadChildren: () => import('./tablinks/tablinks.module').then( m => m.TablinksPageModule)
  },  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
