// solicitud-cotizacion-response.model.ts
import { ClassGeneric } from "../../../util/ClassGeneric";
import { ProductoResponse } from "./ProductoResponse";


export class SolicitudProductoResponse extends ClassGeneric {
    id?: number;
    producto?: ProductoResponse;
    cantidad?: number;
}