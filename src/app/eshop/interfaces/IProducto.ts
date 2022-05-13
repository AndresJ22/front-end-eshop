export interface IProducto {
  ok: boolean;
  producto: Producto;
}

export interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  imagen: string;
  cantidad: number;
}
