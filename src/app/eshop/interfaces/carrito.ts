import { v4 as uuidv4 } from 'uuid';
export interface ICarritoItem {
  idCarritoItem: string;
  nombreProducto: string;
  precio: number;
  cantidad: number;
  fotoUrl: string;
  categoria: any;
}

export interface ICarrito {
  idCarritoCompra: any;
  items: ICarritoItem[];
}

export class Carrito implements ICarrito {
  items: ICarritoItem[] = [];
  idCarritoCompra = uuidv4();
}
export interface ICarritoTotal {
  igv: number;
  subtotal: number;
  total: number;
}

