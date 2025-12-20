import { useFormContext } from "../Context/FormContext";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
interface listType {
  name: string;
  date: string;
  category: string;
}

export default function Add({ onAddTodo, todoList }: any) {
  const { formClose, setFormState } = useFormContext();
  function hanldeForm() {
    setFormState(!formClose);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<listType>();

  async function onSubmit(data: any) {
    await onAddTodo(data);
    reset();

    console.log("submit btn clicked");
  }
  useEffect(() => {
    console.log("Todos to be displayed", todoList);
  }, []);

  return (
    <>
      <div className="flex w-full justify-center items-center">
        {todoList && todoList.length > 0 ? (
          <ul className="w-full max-w-md space-y-4">
            {todoList.map((todo: listType, index: number) => (
              <li
                key={index}
                className="bg-slate-700 text-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{todo.name}</p>
                  <p className="text-sm text-slate-400">{todo.date}</p>
                  <p className="text-sm text-slate-400">{todo.category}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center">
            <img src="nolist.png" alt="No tasks" />
          </div>
        )}

        <div
          id="addNewListContainer"
          className={`fixed inset-0 flex justify-center items-center bg-slate-800/50 text-white ${
            formClose ? "block" : "hidden"
          }`}
        >
          <form className="bg-slate-800 backdrop-blur-2xl p-6 rounded">
            <div id="heading" className="flex justify-between gap-6 ">
              <h1 className="text-3xl font-extrabold">CREATE NEW TASK</h1>
              <X
                className="ml-auto  rounded-full bg-lime-400"
                size={30}
                onClick={hanldeForm}
              />
            </div>
            <div id="task" className="my-4">
              <span>TASK NAME</span>
              <input
                type="text"
                className="border outline-0 rounded border-slate-500 w-full pl-4 py-3 my-4 bg-slate-700 text-slate-400"
                placeholder="Todo task..."
                {...register("name")}
              />
              <div id="date" className="flex flex-col m"></div>
              <div className="flex gap-2 justify-between">
                <span className="mb-4">DATE</span>
                <input
                  type="date"
                  className="border outline-0 pl-4 py-3 rounded border-slate-500 text-slate-400 bg-slate-800"
                  {...register("date")}
                />
              </div>
              <div id="cate" className="flex flex-col">
                <span className="mb-4">Categroty</span>
                <select
                  className="border outline-0 pl-4 py-3 rounded border-slate-500 text-slate-400 bg-slate-800"
                  {...register("category")}
                >
                  <option value="Hello">Hello</option>
                  <option value="Hello">Hello</option>
                  <option value="Data">Hello</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="flex justify-center items-center mx-auto  py-2 px-4 mt-4 w-[80%] rounded bg-lime-500 text-black outline-0"
              onClick={handleSubmit(onSubmit)}
            >
              Save Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
