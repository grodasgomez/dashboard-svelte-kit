export const findModel = (dataList: unknown[], value: unknown): unknown => {
  return dataList.find((person)=> {
    for (const key of Object.getOwnPropertyNames(person)){
      if(person[key] === value)
        return true;
    }
    return false;
  });
};