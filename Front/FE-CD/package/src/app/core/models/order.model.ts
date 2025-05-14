export interface Order {

  id?: number;

  supplierId: number;

  vehicleId: number;

  Cantidad: number;

  FechaDeOrden: Date;

  Estado: string;

  CantidadRecibida: number;

  validación: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}
