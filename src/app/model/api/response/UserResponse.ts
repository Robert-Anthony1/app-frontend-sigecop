import { ClassGeneric } from "../../../util/ClassGeneric";
import { Pagina } from "../../dto/Pagina";
import { Proveedor } from "../../dto/Proveedor";
import { RolResponse } from "./RolResponse";

export class UserResponse extends ClassGeneric {
    id?: number;
    rol?: RolResponse;
    proveedor?: Proveedor;
    nombre?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    paginas?: Pagina[];
}
