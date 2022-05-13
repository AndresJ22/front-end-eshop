import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EshopService } from './eshop.service';
import { IProducto, Producto } from './interfaces/IProducto';

@Component({
  selector: 'app-eshop',
  templateUrl: './eshop.component.html',
  styleUrls: ['./eshop.component.scss']
})
export class EshopComponent implements OnInit {
  @ViewChild('search', { static: false }) seachTerm!: ElementRef;
  pageSize: number = 5;
  pageNumber: number = 1;
  totalCount = 0;
  productos!: Producto[];
  search: string = '';
  marcas: any;

  constructor(private eShopService: EshopService) { }

  ngOnInit(): void {
    this.getProductos();
    this.getMarcas();

  }
  getMarcas() {
    this.eShopService.getCategorias().subscribe(data => {
      this.marcas = [{ idMarProd: 0, nombre: 'All' }, ...data.categoria];
      console.log(this.marcas);
    }, error => {
      console.log(error);
    })
  }

  getProductos() {
    let params = {
      limite: this.pageSize,
      desde: this.pageNumber
    }
    this.eShopService.getProductos(params).subscribe(data => {
      this.productos = data.productos;
      this.totalCount = data.total;
      this.pageSize = data.limiteN;
      this.pageNumber = data.desdeN;
      data.productos.forEach((element: any) => {
        element.imagen = `http://localhost:3000/api/uploads/productos/${element._id}`;
      }
      );
      // console.log(this.productos);
    }, err => {
      console.log(err);
    });
  }
  onSearch() {
    this.search = this.seachTerm.nativeElement.value;

    this.pageNumber = 0;
    this.getProductos();
  }

  onPagingFooterChanged(event: any): void {
    console.log(event);
    this.pageNumber = event;
    this.getProductos();
  }
  onReset() {
    this.seachTerm.nativeElement.value = undefined;
    this.search = '';
    this.pageNumber = 0;
    this.getProductos();
  }
  // AUTOCOMPLETE
  buscando() {
    this.eShopService.getProductosAutocomplete(this.search.trim()).subscribe(data => {
      console.log(data);
    })
  }
  onSortSelected(e: any) {
    console.log(e.target.value);
    let preAscDesc = ""
    if (e.target.value === "1") {
      preAscDesc = "precioAlto";
    } else if (e.target.value === "2") {
      preAscDesc = "precioBajo";
    } else {
      return;
    }
    let params = {
      limite: this.pageSize,
      desde: this.pageNumber,
      tipo: preAscDesc
    }

    this.eShopService.getFiltrarPrecioProductos(params).subscribe(data => {
      console.log("adsad");
      this.productos = data.productos;
      this.totalCount = data.total;
      this.pageSize = data.limiteN;
      this.pageNumber = data.desdeN;
      data.productos.forEach((element: any) => {
        element.imagen = `http://localhost:3000/api/uploads/productos/${element._id}`;
      }
      );
    });

  }
  onMarcaSelected(id: string) {
    console.log(id);
    if (id === undefined) {
      console.log("All");
      return this.getProductos();
    }
    this.pageNumber = 1;
    this.eShopService.getProductosCategoria(id).subscribe(data => {
      this.productos = data.productos;
      this.totalCount = data.total;
      this.pageSize = 5;
      this.pageNumber = 1;
      data.productos.forEach((element: any) => {
        element.imagen = `http://localhost:3000/api/uploads/productos/${element._id}`;
      }
      );
      // console.log(this.productos);
    }
      , err => {
        console.log(err);
      }
    );
  }

}
