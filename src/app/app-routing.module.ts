import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: '',
    redirectTo: 'tabs',
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
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
