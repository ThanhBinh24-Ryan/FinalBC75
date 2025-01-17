import { useState } from "react";

export const useInputState = <T>(initialState: T[]) => {
  const [array, setArray] = useState<T[]>(initialState);

  const handleAdd = (defaultValue: T) => {
    setArray([...array, defaultValue]);
  };

  const handleRemove = (index: number) => {
    const updatedArray = [...array];
    updatedArray.splice(index, 1);
    setArray(updatedArray);
  };

  const handleChange = (index: number, value: T) => {
    const updatedArray = [...array];
    updatedArray[index] = value;
    setArray(updatedArray);
  };

  return { array, handleAdd, handleRemove, handleChange };
};

