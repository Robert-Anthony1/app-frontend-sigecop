import { ClassGeneric } from "../../../util/ClassGeneric";
import { Categoria } from "../../dto/Categoria";

export class ProductoResponse extends ClassGeneric {

    id?: number;
    categoria?: Categoria;
    nombre?: string;
    descripcion?: string;
    precioUnitario?: number;
}
