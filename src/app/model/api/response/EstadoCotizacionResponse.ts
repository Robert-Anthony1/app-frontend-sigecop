// estado-solicitud-response.model.ts
import { ClassGeneric } from "../../../util/ClassGeneric";

export class EstadoCotizacionResponse extends ClassGeneric {
    id?: number;
    descripcion?: string;
    detalle?: string;
}