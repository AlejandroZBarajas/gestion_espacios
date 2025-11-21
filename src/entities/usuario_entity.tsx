export default interface UsuarioEntity {
  usuario_id: number;
  nombre: string;
  apellido: string;
  apellido2?: string;
  email: string;
  rol: "administrador" | "docente";
  contrasena?:string
  fecha_creacion: string;
  activo: boolean;
}
