import { ClassGeneric } from "../../../util/ClassGeneric";
import { Proveedor } from "../../dto/Proveedor";
import { UserResponse } from "./UserResponse";
import { SolicitudProductoResponse } from "./SolicitudProductoResponse";
import { EstadoSolicitudResponse } from "./EstadoSolicitudResponse";

export class SolicitudResponse extends ClassGeneric {

    id?: number;
    codigo?: string;
    descripcion?: string;
    fechaCreacion?: Date;
    fechaFinalizado?: Date;
    usuarioCreacion?: UserResponse;
    usuarioEstado?: UserResponse;
    estado?: EstadoSolicitudResponse;
    finalizado?: Boolean;
    proveedores?: Proveedor[] = [];
    solicitudProducto?: SolicitudProductoResponse[] = [];
}