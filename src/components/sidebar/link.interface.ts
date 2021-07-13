export interface SidebarMenu{
  label?: string;
  items: SidebarMenuItem[];
}

export interface SidebarMenuItem{
  path: string;
  label?:string;
  icon?:string;
}