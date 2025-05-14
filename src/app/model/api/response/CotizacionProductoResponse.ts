import { ClassGeneric } from "../../../util/ClassGeneric";
import { Pagina } from "../../dto/Pagina";
import { Proveedor } from "../../dto/Proveedor";
import { ProductoResponse } from "./ProductoResponse";
import { RolResponse } from "./RolResponse";

export class CotizacionProductoResponse extends ClassGeneric {
    id?: number;
    cantidadSolicitado?: number;
    cantidadCotizada?: number;
    precioUnitario?: number;
    producto?: ProductoResponse;
}
