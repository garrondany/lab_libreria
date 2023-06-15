export interface Orden {
    id: number;
    idProducto: number;
    idCliente: number;
    cantidad: number;
    totalventa: number;
    fechaemision:Date;
  }