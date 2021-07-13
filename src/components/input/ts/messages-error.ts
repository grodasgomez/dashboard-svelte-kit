export const MESSAGE_ERROR = {
  REQUIRED: (name:string): string => { return `El campo ${name} es requerido`},
  EMAIL: (name:string): string => { return `El campo ${name} debe ser un email v&aacute;lido`},
  LENGTH: (name:string, length:number): string => { return `El campo ${name} debe contener exactamente ${length} caracteres`},

}
