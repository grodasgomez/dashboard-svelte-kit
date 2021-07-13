import type {  TableModel } from "../../table/table.interface";

export class ClientModel implements TableModel{
  id: number;
  denomination: string;
  email: string;
  phoneNumber: string;
}


export const CLIENT_HEADER: string[] = ['Id', 'Razon Social', 'Email','Numero telefono'];