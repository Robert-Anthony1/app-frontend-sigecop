// producto-cotizacion-request.model.ts
import { ClassGeneric } from "../../../util/ClassGeneric";

export class SolicitudProductoRequest extends ClassGeneric {
    id?: number;
    productoId?: number;
    cantidad?: number;
    productoNombre?: String;
}