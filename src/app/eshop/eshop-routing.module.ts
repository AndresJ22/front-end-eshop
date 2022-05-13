import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EshopComponent } from './eshop.component';
import { ProductoDetailsComponent } from './producto-details/producto-details.component';
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  {
    path: 'editar/:id',
    component: ProductoDetailsComponent
  },
  {
    path: 'home',
    component: EshopComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EshopRoutingModule { }
