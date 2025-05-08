import { ClassGeneric } from "../../../util/ClassGeneric";

export class UserRequest extends ClassGeneric{

    id?: number;
    rolId?: number;
    proveedorId?: number;
    nombre?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    
    updatePassword?: boolean;
    cuenta?: string;
    clave?: string;
}
