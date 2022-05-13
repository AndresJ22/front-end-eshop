import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './error/page404/page404.component';

const routes: Routes = [
  {
    path: 'eshop',
    loadChildren: () => import('./eshop/eshop.module').then(m => m.EshopModule)
  },
  {
    path: '404', component: Page404Component
  },
  {
    path: '**', redirectTo: 'eshop'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
