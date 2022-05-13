import { Component, Input, OnInit } from '@angular/core';
import { EshopService } from '../eshop.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.scss']
})
export class ProductoItemComponent implements OnInit {

  imgback = 'http://localhost:3000/api/uploads/productos/';
  constructor(private eShopService: EshopService) { }
  @Input() producto: any;

  ngOnInit(): void {
    // console.log(this.producto);
    // this.eShopService.verProducto(this.producto._id).subscribe(data => {
    //   console.log(data);
    // });
  }
  addItemToCarrito() {
    this.eShopService.addItemToCarrito(this.producto);
  }
  verCarritoSweetAlert() {
    //Al hacer clic en el botón se debe mostrar un popup el listado de los productos del
    //carrito con su precio y el total a pagar.
    Swal.fire({
      title: 'Carrito',
      html: `<div class="container">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Listado</h3>
            </div>
            <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                ${this.eShopService.getCarrito().items.map(item => {
        return `
                  <tr>
                    <td>${item.nombreProducto}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.precio}</td>
                    <td>${item.cantidad * item.precio}</td>
                  </tr>
                  `;
      }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
             </div>
      </div>
    </div>`,


    })
  }
}
