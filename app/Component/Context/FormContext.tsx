import { Children, createContext, useContext, useState } from "react";

const FormContext = createContext<any>(null);

export function FormProvider({ children }: any) {
  const [formClose, setFormState] = useState(false);
  const [filter, setFilter] = useState("All Tasks");
  return (
    <FormContext.Provider
      value={{ formClose, setFormState, setFilter, filter }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
