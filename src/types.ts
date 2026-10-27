export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

export interface Pedido {
  id: number;
  cliente: string;
  productoId: number;
  cantidad: number;
  fecha: string;
  estado: "Pendiente" | "En proceso" | "Entregado";
}