"use client";
import { useFormContext } from "../Context/FormContext";
import { X, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../button";

interface listType {
  id?: string;
  name: string;
  date: string;
  category: string;
  priority: "normal" | "important";
  completed?: boolean;
}

export default function Add({ onAddTodo, todoList, updateTodo }: any) {
  const { formClose, setFormState, sideSelected, setSideSelected } =
    useFormContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<listType | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<listType>();

  const handleForm = () => setFormState(!formClose);

  const onSubmit = async (data: listType) => {
    const newTodo = {
      id: crypto.randomUUID(),
      ...data,
      completed: false,
    };

    await onAddTodo(newTodo);
    reset();
  };

  const handleCheckboxClick = async (todo: listType) => {
    setSelectedTodo(todo);
    setModalOpen(true);
  };

  const handleConfiramtion = async () => {
    if (selectedTodo) {
      console.log("Selected todo", selectedTodo);
      const updatedTodo = { ...selectedTodo, completed: true };
      await updateTodo(updatedTodo);
      setModalOpen(false);
    }
  };
  const handleCancellation = async () => {
    setModalOpen(false);
  };
  const [isDeleting, setIsDeleting] = useState(false);
  const [targetId, setTargetId] = useState("");
  const handleDelete = (todo: any) => {
    setIsDeleting(true);
    setTargetId(todo.id);
    console.log("target id", targetId);
  };
  const confirmDelete = async (todo: listType) => {
    if (!targetId) return;
    console.log("target id", targetId);
    try {
      const req = await fetch("/api/todo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetId }),
      });
      window.location.reload();
    } catch (error) {
      console.log("Error deleteing", error);
    } finally {
      setIsDeleting(false);
      setTargetId("");
    }
  };

  return (
    <div className="flex ml-20 w-full justify-center">
      <div className="mt-22">
        {todoList?.length > 0 ? (
          todoList.map((todo: listType, index: number) => (
            <div
              key={index}
              className="flex flex-col my-4 hover:translate-x-3 transition-transform ease-out duration-300"
            >
              <div className="w-full bg-slate-600 rounded">
                <div className="flex gap-10 px-4 max-w-4xl py-4">
                  <p
                    className="md:text-2xl text-lg text-white hover:text-lime-400 
              w-[150px] sm:w-[300px] md:w-[400px] 
              wrap-break-word"
                  >
                    {todo.name}
                  </p>
                  <p className="ml-auto rounded-2xl bg-slate-400 px-4 h-10 flex items-center py-1 text-black hover:bg-slate-300">
                    {todo.category.toUpperCase()}
                  </p>
                </div>
                <div className="flex">
                  <div className="flex  items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!todo.completed}
                      className="ml-4 mt-4 h-6 w-6 cursor-pointer rounded border-slate-600 bg-slate-800 accent-lime-500 transition-all hover:scale-110"
                      onChange={() => handleCheckboxClick(todo)}
                    />
                    <Trash
                      className="h-6 w-6 mt-3.5 text-white hover:text-red-700  "
                      onClick={() => handleDelete(todo)}
                    ></Trash>
                  </div>

                  <p className="ml-auto mr-4 py-4 text-white">{todo.date}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <img src="nolist.png" alt="" />
        )}
      </div>

      <div
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
              onClick={handleForm}
            />
          </div>

          <div className="mb-5">
            <label className="text-sm font-semibold text-slate-300">
              Task Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="mt-2 w-full px-4 py-3 rounded-xl bg-slate-700 text-white border border-slate-600 outline-none focus:ring-2 focus:ring-lime-500"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">Task name is required</p>
            )}
          </div>

          <div className="mb-5">
            <label className="text-sm font-semibold text-slate-300">
              Due Date
            </label>
            <input
              type="date"
              {...register("date", { required: true })}
              className="mt-2 w-full px-4 py-3 rounded-xl bg-slate-700 text-slate-300 border border-slate-600 outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div className="mb-5">
            <label className="text-sm font-semibold text-slate-300">
              Category
            </label>
            <select
              {...register("category", { required: true })}
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
                  {...register("priority", { required: true })}
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

      {modalOpen && (
        <div className=" fixed inset-0 flex justify-center items-center  text-black bg-slate-400/10   rounded  ">
          <div className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full flex flex-col items-center shadow-lg">
            <p className="font-bold text-white text-2xl">Mark as Complete?</p>
            <div id="btn" className="flex gap-4 mt-8">
              <button
                className="px-3 py-2 rounded bg-lime-400 text-2xl text-white"
                onClick={handleConfiramtion}
              >
                Confirm
              </button>
              <button
                className="px-3 py-2 rounded bg-red-500 text-2xl text-white"
                onClick={handleCancellation}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleting && (
        <div className="fixed inset-0 flex justify-center items-center text-white bg-slate-900/60 backdrop-blur-sm z-50">
          <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full flex flex-col items-center shadow-2xl border border-slate-700">
            <div className="bg-red-500/10 p-3 rounded-full mb-4">
              <Trash className="text-red-500" size={32} />
            </div>

            <p className="font-bold text-2xl text-center">Delete Task?</p>
            <p className="text-slate-400 text-center mt-2">
              Are you sure you want to remove{" "}
              <span className="text-white font-semibold"></span>? This action
              cannot be undone.
            </p>

            <div className="flex gap-4 mt-8 w-full">
              <button
                className="flex-1 px-4 py-3 rounded-xl bg-slate-700 text-white font-semibold hover:bg-slate-600 transition"
                onClick={() => setIsDeleting(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 transition"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
