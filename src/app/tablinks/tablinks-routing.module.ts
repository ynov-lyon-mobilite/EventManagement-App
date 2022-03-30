import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [  
  {
   path: '',    
   component: TablinksPage,
   children: [

      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: 'home/free-event',
        loadChildren: () => import('../free-event/free-event.module').then( m => m.FreeEventPageModule)
      },
      {
        path: 'edit-profil',
        loadChildren: () => import('../edit-profil/edit-profil.module').then( m => m.EditProfilPageModule)
      },
      {
        path: 'edit-pass',
        loadChildren: () => import('../edit-pass/edit-pass.module').then( m => m.EditPassPageModule)
      },
      {
        path: '',
        redirectTo: '/tablinks/home',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule {}
