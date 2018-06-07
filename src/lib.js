export const precisionRound = (number, precision) => {
  const factor = Math.pow(10, precision);
  if(factor === 0) return 0;
  return Math.round(number * factor) / factor;
};

export const isPrimitiveNumber = number => {
  const isNumberOrNull = !isNaN(number); // limits to Arrays, numbers, null
  const isNotNull = number !== null; // limits to Arrays, null
  const typeIsNumber = typeof number === 'number'; // eliminates Arrays
  return isNumberOrNull && isNotNull && typeIsNumber;
};

export const isObjectLiteral = object => {
  const isObject = object instanceof Object;
  const isNotArray = !Array.isArray(object);
  return isObject && isNotArray;
};

export const titleCaseWord = word => {
  if(typeof word !== 'string') return;
  const end = word.slice(1,word.length);
  const front = word.slice(0,1);
  return `${front.toUpperCase()}${end}`;
};

export const lowerCaseWord = word => {
  if(typeof word !== 'string') return;
  const end = word.slice(1,word.length);
  const front = word.slice(0,1);
  return `${front.toLowerCase()}${end}`;
};

export const immutableArrayInsert = (index, array, itemToUpdate) => {
  // input: index: integer to replace in array.
  // input: array: existing array to edit
  // input: itemToUpdate: what to put into the array: can be any data type
  // output: new array with item added (prepended, appended, replaced, based on index)
  // invalid index defaults to prepend
  if(!Array.isArray(array)) return [];
  if(!itemToUpdate) return array;
  if (index === null || index === undefined || isNaN(index)) {
    return [itemToUpdate, ...array];
  }
  if (index <= 0){
    const remainder = array.slice(1,array.length);
    const newArray = [itemToUpdate, ...remainder];
    return newArray;
  }
  if (index >= array.length -1){
    const remainder = array.slice(0,array.length-1);
    const newArray =  [...remainder, itemToUpdate];
    return newArray;
  }
  const remainderFront = array.slice(0,index);
  const remainderBack = array.slice(index+1,array.length);
  const newArray = [...remainderFront, itemToUpdate, ...remainderBack];
  return newArray;
}

export const immutableArraySplice = (index, array) => {
  // input: index: integer to delete from array.
  // input: array: existing array to edit
  // output: new array with item removed
  // invalid index does nothing
  if(!Array.isArray(array)) return [];
  if(isNaN(index)||index<0) return array;
  if (index > array.length -1) return array;
  // console.log('index',index, 'validated')
  if (index === 0){
    // console.log('index',index, '0')
    return array.slice(1,array.length);
  }
  if (index === array.length -1){
    // console.log('index',index, 'end')
    return array.slice(0,array.length-1);
  }
  // console.log('index',index, 'middle')
  const remainderFront = array.slice(0, index);
  const remainderBack = array.slice(index+1, array.length);
  const newArray = [...remainderFront, ...remainderBack];
  // console.log('newArray',newArray)

  return newArray;
}