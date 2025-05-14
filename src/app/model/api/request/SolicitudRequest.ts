import { SolicitudProductoRequest } from "./SolicitudProductoRequest";

export class SolicitudRequest{

    id?: number;
    codigo?: String;
    descripcion?: string;
    fechaCreacion?: Date;
    fechaVencimiento?: Date;
    estadoId?: number;
    proveedores?: number[] = [];
    solicitudProducto?: SolicitudProductoRequest[] = [];
}