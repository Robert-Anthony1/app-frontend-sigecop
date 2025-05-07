import { IPaginaResponse } from "./IPaginaResponse";
import { IRolResponse } from "./IRolResponse";
import { ITipoDocumentoResponse } from "./ITipoDocumentoResponse";

export interface IUserResponse {
    id?: number;
    rol?: IRolResponse;
    tipoDocumento?: ITipoDocumentoResponse;
    nombre?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    empresa?: string;
    correo?: string;
    paginas?: IPaginaResponse[];

}
