import { isLoading } from "../stores/loading.store";

export interface Person {
  denomination: string;
  ruc: string;
}
export const getPersonByRuc = async (value: string): Promise<Person[]> => {
  isLoading.set(true);
  try {
    const response = await fetch(`http://localhost:3000/ruc-client/${value}`);
    const data = await response.json();
    console.log(data);

    const persons: Person[] = [];
    for (let i = 0; i < data.data.length; i++) {
      const ruc = data.data[i].ruc;
      const completeName = data.data[i].denomination.split(',');
      const name = completeName[1]?.trim();
      const lastname = completeName[0].trim();
      
      let denomination = name ? name : '';
      denomination = denomination.concat(' '+lastname);
      persons.push({denomination, ruc});
    }
   
    isLoading.set(false);
    
    return persons;
  } catch (error) {
    console.log(error);
    isLoading.set(false);
    return [];

  }

}
