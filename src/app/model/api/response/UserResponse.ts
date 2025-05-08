import { ClassGeneric } from "../../../util/ClassGeneric";
import { Proveedor } from "../../dto/Proveedor";
import { PaginaResponse } from "./PaginaResponse";
import { RolResponse } from "./RolResponse";

export class UserResponse extends ClassGeneric {
    id?: number;
    rol?: RolResponse;
    proveedor?: Proveedor;
    nombre?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    paginas?: PaginaResponse[];
}
