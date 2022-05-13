import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EshopRoutingModule } from './eshop-routing.module';
import { ProductoItemComponent } from './producto-item/producto-item.component';
import { SharedModule } from '../shared/shared.module';
import { EshopComponent } from './eshop.component';
import { ProductoDetailsComponent } from './producto-details/producto-details.component';
import { CarritoComponent } from './carrito/carrito.component';
import { OrdenTotalComponent } from './carrito/orden-total/orden-total.component';
@NgModule({
  declarations: [
    ProductoItemComponent,
    EshopComponent,
    ProductoDetailsComponent,
    CarritoComponent,
    OrdenTotalComponent
  ],
  imports: [
    EshopRoutingModule,
    CommonModule,
    SharedModule,

  ],
  exports: [
    ProductoItemComponent,
    EshopComponent,
    ProductoDetailsComponent
  ]
})
export class EshopModule { }
