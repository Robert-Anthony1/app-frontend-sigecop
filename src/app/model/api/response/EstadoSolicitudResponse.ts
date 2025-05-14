// estado-solicitud-response.model.ts
import { ClassGeneric } from "../../../util/ClassGeneric";

export class EstadoSolicitudResponse extends ClassGeneric {
    id?: number;
    descripcion?: string;
    detalle?: string;
}