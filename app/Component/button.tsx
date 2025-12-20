"use client";
import { useFormContext } from "./Context/FormContext";
import { Search, Plus } from "lucide-react";
export default function Button({ variant = "primary", onClick }: any) {
  const { formClose, setFormState }: any = useFormContext();
  function handleFormOpen() {
    setFormState(true);
    console.log(formClose);
  }

  return (
    <>
      <div
        id="buttonContainer"
        className="mr-6 relative flex  items-center text-white "
      >
        <Plus className="absolute inset-y-0 top-2 " size={22} />
        <button
          className="group bg-lime-500 py-2 md:py-3 px-8 rounded w-full leading-none flex hover:bg-lime-600 cursor-pointer transition-transform ease-out duration-200"
          onClick={handleFormOpen}
        >
          <span>Add Task</span>
        </button>
      </div>
    </>
  );
}
