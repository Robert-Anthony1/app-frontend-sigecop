import { ClassGeneric } from "../../../util/ClassGeneric";

export class RolResponse extends ClassGeneric {
    id?: number;
    codigo?: string;
    nombre?: string;
    isProveedor?: boolean;
    paginas: number[] = [];

    constructor() {
        super();
    }
}
