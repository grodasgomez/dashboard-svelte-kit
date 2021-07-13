export interface TableModel{
  id: number;
}


export interface TableHeader{
  label: string;
  value: string;
}


export interface FieldFilter{
  label: string;
  name: string;
  value?: string;
}