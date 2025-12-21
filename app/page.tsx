"use client";
import Image from "next/image";
import Add from "./Component/addarea/add";
import Sidebar from "./Component/sidebar/sidebar";

import { useEffect, useState } from "react";
import { useFormContext } from "./Component/Context/FormContext";
interface listType {
  name: string;
  date: string;
  category: string;
}
export default function Home() {
  const { formClose, setFormState } = useFormContext();
  const [todoList, setTodoList] = useState<listType[]>([]);
  const [saveCompleted, setSaveCompleted] = useState(false);

  async function saveTodo(newTodo: listType) {
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const result = await res.json();
      console.log("success", result);
      setTodoList((prevTodo) => {
        return [...prevTodo, newTodo];
        console.log(prevTodo);
        console.log("list", newTodo);
      });
    } catch (error) {
      console.log("Eroro saving", error);
    } finally {
      setTimeout(() => {
        setFormState(false);
      }, 500);
    }
  }

  useEffect(() => {
    async function getTodoList() {
      fetch("api/todo").then((res) =>
        res.json().then((data) => setTodoList(data))
      );
    }

    getTodoList();
  }, []);
  useEffect(() => {
    console.log("Current todoList state:", todoList);
  }, [todoList]);

  return (
    <>
      <div className="w-full">
        <div id="content" className="flex  md:max-w-7xl max-w-4xl w-full ">
          <Sidebar />
          <Add
            onAddTodo={saveTodo}
            todoList={todoList}
            saveCompleted={saveCompleted}
          />
        </div>
      </div>
    </>
  );
}
