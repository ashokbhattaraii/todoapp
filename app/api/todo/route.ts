import { NextResponse } from "next/server";
import fs from "fs/promises";
import { readFile, writeFile } from "fs";
import path from "path";
const filePath = path.join(process.cwd(), "data", "todoList.json");
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const existingTodo = await fs.readFile(filePath, "utf-8");
    const todo = JSON.parse(existingTodo);
    todo.push(data);
    const updatedTodo = JSON.stringify(todo, null, 2);
    const finalTodo = await fs.writeFile(filePath, updatedTodo);
    return NextResponse.json(
      {
        messgae: "Todo Saved Successfully",
        data: todo,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        messgae: "Error saving todo",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const todos = await fs.readFile(filePath, "utf-8");
    const todoList = JSON.parse(todos);
    console.log("Fetched Todos:", todoList);
    return NextResponse.json(todoList);
  } catch (error) {
    console.log("Get error", error);
    return NextResponse.json([]);
  }
}
