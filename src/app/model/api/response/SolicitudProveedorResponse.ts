// estado-solicitud-response.model.ts
import { ClassGeneric } from "../../../util/ClassGeneric";
import { Proveedor } from "../../dto/Proveedor";
import { SolicitudResponse } from "./SolicitudResponse";

export class SolicitudProveedorResponse extends ClassGeneric {
    id?: number;
    proveedor?: Proveedor;
    solicitud?: SolicitudResponse;
}