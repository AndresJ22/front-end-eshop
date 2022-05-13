import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICarrito, ICarritoTotal, ICarritoItem, Carrito } from './interfaces/carrito';
import { Producto } from './interfaces/IAutocomplete';

@Injectable({
  providedIn: 'root'
})
export class EshopService {

  constructor(private http: HttpClient) { }
  private carritoSource = new BehaviorSubject<ICarrito>(null);
  private carritoTotalSource = new BehaviorSubject<ICarritoTotal>(null);
  shopping = 0;

  getProductos(params: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/producto`, { params });
  }
  //http://localhost:3000/api/producto/filtrar/precio?limite=5&desde=1&tipo=precioAlto
  getFiltrarPrecioProductos(params: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/producto/filtrar/precio`, { params });
  }

  verProducto(id: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/uploads/productos/' + id);
  }

  // AUTOCOMPLETE
  getProductosAutocomplete(q: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/producto/buscar/${q}`);
  }

  //http://localhost:3000/api/categoria
  // MEJORAR CON REDIS POR BACKEND 2DO FASE
  getCategorias(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/categoria`);
  }
  //http://localhost:3000/api/producto/buscar/categoria/627be51cc4bfc1f833d362b0
  getProductosCategoria(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/producto/buscar/categoria/${id}`);
  }

  // obtenerProducto
  //http://localhost:3000/api/producto/627c2cb778bfc067711c0a3e
  getProducto(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/producto/${id}`);
  }


  /// Carrito de compras // localStorage retornar un arreglo para calcular el total
  getCarrito(): ICarrito {
    // calcular el total del carrito
    const carrito: ICarrito = JSON.parse(localStorage.getItem('carrito'));
    if (carrito) {
      this.carritoSource.next(carrito);
      this.calculateTotal();
    }
    return carrito;
  }

  setCarrito(carrito: ICarrito): void {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.carritoSource.next(carrito);
    this.calculateTotal();
  }

  getValorActualCarrito(): ICarrito {
    return this.carritoSource.value;
  }
  createCarrito(): ICarrito {
    const carrito = new Carrito();
    localStorage.setItem('idCarritoCompra', carrito.idCarritoCompra);//almacena en el navegador
    return carrito;
  }
  addOrUpdateItem(items: ICarritoItem[], itemToAdd: ICarritoItem, cantidad: number): ICarritoItem[] {
    console.log(items);
    const index = items.findIndex(i => i.idCarritoItem === itemToAdd.idCarritoItem);
    if (index === -1) {
      itemToAdd.cantidad = cantidad;
      items.push(itemToAdd);
    } else {
      items[index].cantidad += cantidad;
    }
    return items;
  }

  addItemToCarrito(item: Producto, cantidad = 1) {
    const itemToAdd: ICarritoItem = this.mapProductoItemCarrito(item, cantidad);
    const carrito = this.getValorActualCarrito() ?? this.createCarrito();
    carrito.items = this.addOrUpdateItem(carrito.items, itemToAdd, cantidad);
    this.setCarrito(carrito);
  }
  incrementItemCantidad(item: ICarritoItem) {
    const carrito = this.getValorActualCarrito();
    const foundItemIndex = carrito.items.findIndex(x => x.idCarritoItem === item.idCarritoItem);
    carrito.items[foundItemIndex].cantidad++;
    this.setCarrito(carrito);
  }
  decrementItemCantidad(item: ICarritoItem) {
    const carrito = this.getValorActualCarrito();
    const foundItemIndex = carrito.items.findIndex(x => x.idCarritoItem === item.idCarritoItem);
    if (carrito.items[foundItemIndex].cantidad > 1) {
      carrito.items[foundItemIndex].cantidad--
      this.setCarrito(carrito);
    } else {
      this.eliminarItemSeleccionadoCarrito(item);
    }
  }

  eliminarItemSeleccionadoCarrito(item: ICarritoItem) {
    const carrito = this.getValorActualCarrito();
    if (carrito.items.some(x => x.idCarritoItem === item.idCarritoItem)) {
      carrito.items = carrito.items.filter(i => i.idCarritoItem !== item.idCarritoItem);
      if (carrito.items.length > 0) {
        this.setCarrito(carrito);
      } else {
        this.deleteCarrito(carrito);
      }
    }
  }

  deleteCarrito(carrito: ICarrito) {
    localStorage.removeItem('carrito');
    this.carritoSource.next(null);
    this.carritoTotalSource.next(null);
  }

  private calculateTotal() {
    const carrito = this.getValorActualCarrito();
    const igv = 19.5;
    let subtotal = 0;
    const total = carrito.items.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
    subtotal = total / (1 + igv / 100);
    const carritoTotal: ICarritoTotal = {
      subtotal: subtotal,
      igv: total - subtotal,
      total: total
    }
    this.carritoTotalSource.next(carritoTotal);
  }
  // const subtotal = carrito.items.reduce((a, b) => (b.precio * b.cantidad) + a, 0);
  // const total = subtotal + igv;
  //   this.carritoTotalSource.next({ igv, total, subtotal });
  private mapProductoItemCarrito(item: Producto, cantidad: number): ICarritoItem {
    return {
      idCarritoItem: item._id,
      nombreProducto: item.nombre,
      precio: item.precio,
      fotoUrl: item.imagen,
      cantidad,
      categoria: item.categoria
    }
  }

  getCarritoTotal(): Observable<any> {
    return this.carritoTotalSource.asObservable();
  }

}
