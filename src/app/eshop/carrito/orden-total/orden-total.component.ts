import { Component, OnInit } from '@angular/core';
import { ICarritoTotal } from '../../interfaces/carrito';
import { EshopService } from '../../eshop.service';

@Component({
  selector: 'app-orden-total',
  templateUrl: './orden-total.component.html',
  styleUrls: ['./orden-total.component.scss']
})
export class OrdenTotalComponent implements OnInit {
  carritoTotal: ICarritoTotal;
  constructor(private eshopService: EshopService) { }

  ngOnInit(): void {
    this.getCarritoTotal();
  }

  getCarritoTotal() {
     this.eshopService.getCarritoTotal().subscribe(
      data => {
        this.carritoTotal = data;
        console.log(this.carritoTotal);
      }
    );

  }

}
