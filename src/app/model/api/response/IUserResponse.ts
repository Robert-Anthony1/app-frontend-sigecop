import { IPaginaResponse } from "./IPaginaResponse";
import { IRolResponse } from "./IRolResponse";

export interface IUserResponse {
    id: number;
    rol?: IRolResponse;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    empresa: string;
    correo: string;
    paginas?: IPaginaResponse[];
}
