import { useFormContext } from "../Context/FormContext";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
interface listType {
  name: string;
  date: string;
  category: string;
  priority: "Normal" | "Important";
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
      <div className="flex w-full mt-20 px-4">
        <div>
          {todoList.length > 0 ? (
            todoList.map((todo: any, index: any) => {
              return (
                <>
                  <div
                    id="todo"
                    className="flex flex-col my-4 hover:translate-x-3 transition-transform ease-out duration-300"
                    key={index}
                  >
                    <div
                      key={index}
                      id="listTodo"
                      className="w-full bg-slate-600 rounded"
                    >
                      <div
                        key={index}
                        className="flex gap-10 px-4 max-w-4xl py-4"
                      >
                        <p className="text-2xl text-white hover:text-lime-400">
                          {todo.name}
                        </p>
                        <p className="ml-auto rounded-2xl bg-slate-400 px-4 py-1 text-black hover:bg-slate-300">
                          {todo.category.toUpperCase()}
                        </p>
                      </div>
                      <div className="flex">
                        <input
                          type="checkbox"
                          className="ml-4 mt-4 h-6 w-6 cursor-pointer rounded border-slate-600 bg-slate-800 accent-lime-500 transition-all hover:scale-110 "
                        />

                        <p className="ml-auto mr-4 py-4 text-white">
                          {todo.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <img src="nolist.png" alt="" />
          )}
        </div>
        <div
          id="addNewListContainer"
          className={`fixed inset-0 flex justify-center items-center bg-slate-800/50 text-white ${
            formClose ? "block" : "hidden"
          }`}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-700"
          >
            <div className="flex items-center mb-6">
              <h1 className="text-2xl font-extrabold text-white">
                Create New Task
              </h1>
              <X
                className="ml-auto cursor-pointer rounded-full p-1 bg-lime-400 text-black hover:scale-105 transition"
                size={28}
                onClick={hanldeForm}
              />
            </div>

            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300">
                Task Name
              </label>
              <input
                type="text"
                placeholder="What needs to be done?"
                {...register("name", { required: true })}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-slate-700 text-white border border-slate-600 outline-none focus:ring-2 focus:ring-lime-500"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">
                  Task name is required
                </p>
              )}
            </div>

            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300">
                Due Date
              </label>
              <input
                type="date"
                {...register("date")}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-slate-700 text-slate-300 border border-slate-600 outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300">
                Category
              </label>
              <select
                {...register("category")}
                className="mt-2 w-full px-4 py-3 rounded-xl bg-slate-700 text-slate-300 border border-slate-600 outline-none focus:ring-2 focus:ring-lime-500"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-300 mb-2 block">
                Priority
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-slate-300">
                  <input
                    type="radio"
                    value="normal"
                    {...register("priority")}
                    defaultChecked
                    className="accent-lime-500"
                  />
                  Normal
                </label>

                <label className="flex items-center gap-2 text-slate-300">
                  <input
                    type="radio"
                    value="important"
                    {...register("priority")}
                    className="accent-red-500"
                  />
                  Important ⭐
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-lime-500 text-black font-bold text-lg hover:bg-lime-400 transition"
            >
              Save Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
