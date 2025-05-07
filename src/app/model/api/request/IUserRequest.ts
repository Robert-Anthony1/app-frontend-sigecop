export interface IUserRequest {

    id?: number;
    rolId?: number;
    tipoDocumentoId?: number;
    nombre?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    empresa?: string;
    correo?: string;
    updatePassword?: boolean;

    cuenta?: string;
    clave?: string;
}
