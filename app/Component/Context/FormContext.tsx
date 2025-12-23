import { Children, createContext, useContext, useState } from "react";

const FormContext = createContext<any>(null);

export function FormProvider({ children }: any) {
  const [formClose, setFormState] = useState(false);
  const [filter, setFilter] = useState("All Tasks");
  const [sideSelected, setSideSelected] = useState("All Tasks");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <FormContext.Provider
      value={{
        formClose,
        setFormState,
        setFilter,
        filter,
        sideSelected,
        setSideSelected,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
