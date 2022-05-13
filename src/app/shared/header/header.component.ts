import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICarrito } from '../../eshop/interfaces/carrito';
import { Observable } from 'rxjs';
import { EshopService } from '../../eshop/eshop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  carritoTotal: any;
  constructor(private router: Router, private eshopService: EshopService) { }

  ngOnInit(): void {
    this.carritoTotal = this.eshopService.getCarrito();

  }
  inicio(): void {
    this.router.navigate(['/eshop/home']);
  }

  verCarrito(): void {
    this.router.navigate(['/eshop/carrito']);
  }
}
