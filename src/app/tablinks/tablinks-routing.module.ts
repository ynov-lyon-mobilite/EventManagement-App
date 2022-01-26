import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

// const routes: Routes = [
//   {
//     path: 'tablinks',
//     component: TablinksPage,
//     children: [
//       {
//         path: 'home',
//         loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
//       },
//       {
//         path: 'login',
//         loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
//       },
//       {
//         path: 'profile',
//         loadChildren: () => import('../profil/profil.module').then(m => m.ProfilPageModule)
//       },
//       {
//         path: '',
//         redirectTo: '/tablinks/home',
//         pathMatch: 'full'
//       }
//     ]
//   },
//   {
//     path: '',
//     redirectTo: '/tablinks/home',
//     pathMatch: 'full'
//   }
// ];

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
        path: '',
        redirectTo: '/tablinks/home',
        pathMatch: 'full'
      }
    ]
  }
]



    // { 
    //   path: 'dashboard',
    //   loadChildren: './dashboard/dashboard.module#DashboardModule' 
    // },
    // { 
    //   path: 'drivers',
    //   loadChildren: './drivers/drivers.module#DriversModule' 
    // },
  //  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule {}
