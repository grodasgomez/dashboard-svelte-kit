import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'

export const fireMessage = (options: SweetAlertOptions): Promise<SweetAlertResult> => {
  return Swal.fire(options);
}

export const errorMessage = (text:string): Promise<SweetAlertResult> => {
  return Swal.fire({
    title: 'Error!',
    text,
    icon: 'error',
    confirmButtonText: 'Ok'
  });
}


export const saveErrorMessage = (): void => {
  Swal.fire({
    title: 'Error!',
    text: 'Ocurrió un error al intentar guardar',
    icon: 'error',
    confirmButtonText: 'Ok'
  });
}


  export const saveSuccessMessage = (): void => {
    Swal.fire({
      title: 'Exito!',
      text: 'Se guardó exitosamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }