import { Component, OnInit } from '@angular/core';
import { EshopService } from '../eshop.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../interfaces/IAutocomplete';

@Component({
  selector: 'app-producto-details',
  templateUrl: './producto-details.component.html',
  styleUrls: ['./producto-details.component.scss']
})
export class ProductoDetailsComponent implements OnInit {
  producto!: Producto;
  cantidad = 1;
  constructor(private eShopService: EshopService, private activateRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.cargarProducto();
    console.log("asda");
  }

  cargarProducto() {
    this.eShopService.getProducto(this.activateRoute.snapshot.params.id).subscribe(data => {
      this.producto = data.producto;
      this.producto.imagen = `http://localhost:3000/api/uploads/productos/${this.producto._id}`;
      console.log(this.producto);

    });
  }

  incrementItemCantidad() {
    this.cantidad++;
  }
  decrementItemCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }
}
