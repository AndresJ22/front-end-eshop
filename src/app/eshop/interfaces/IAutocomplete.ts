export interface IAutocomplete {
  total: number;
  productos: Producto[];
}

export interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: Categoria;
  precio: number;
  imagen: string;
  cantidad: number;
}

export interface Categoria {
  _id: string;
  nombre: string;
}
