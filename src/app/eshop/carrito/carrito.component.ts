import { Component, OnInit } from '@angular/core';
import { EshopService } from '../eshop.service';
import { ICarrito, ICarritoItem } from '../interfaces/carrito';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito: ICarrito;
  constructor(private eShopService: EshopService) { }

  ngOnInit(): void {
    console.log("CARRITO COMPONENT");
    this.getCarrito();
  }

  getCarrito() {
    this.carrito = this.eShopService.getCarrito();
    console.log(this.carrito);
  }

  eliminarCarritoItem(item: ICarritoItem) {
    this.eShopService.eliminarItemSeleccionadoCarrito(item);
    this.getCarrito();
  }
  incrementItemCantidad(item: ICarritoItem) {
    this.eShopService.incrementItemCantidad(item);
  }
  decrementItemCantidad(item: ICarritoItem) {
    this.eShopService.decrementItemCantidad(item);
  }


}
