import { NextResponse } from "next/server";
import fs from "fs/promises";
import { readFile, writeFile } from "fs";
import path from "path";

import { ManageCookie } from "@/app/cookie/manageCookie";

async function getFilePath() {
  const sessionId = await ManageCookie();
  const dirPath = path.join(process.cwd(), "data");
  const filePath = path.join(dirPath, `todo_List_${sessionId}.json`);

  await fs.mkdir(dirPath, { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify([], null, 2));
  }

  return filePath;
}
export async function POST(req: Request) {
  const filePath = await getFilePath();
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
  const filePath = await getFilePath();
  try {
    const todos = await fs.readFile(filePath, "utf-8");
    const todoList = JSON.parse(todos);
    //.log("Fetched Todos:", todoList);
    return NextResponse.json(todoList);
  } catch (error) {
    //.log("Get error", error);
    return NextResponse.json([]);
  }
}

export async function PATCH(req: Request) {
  const filePath = await getFilePath();
  try {
    const body = await req.json();
    const { name, completed } = body;
    const storedTodo = await fs.readFile(filePath, "utf-8");
    const arrangedTodo = JSON.parse(storedTodo);
    const updatedtodo = arrangedTodo.map((todo: any) => {
      if (todo.name === name) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    await fs.writeFile(filePath, JSON.stringify(updatedtodo, null, 2));
    return NextResponse.json({ message: "Todo updated succcessfullt" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to updated", error });
  }
}

export async function DELETE(req: Request) {
  const filePath = await getFilePath();
  const { targetId } = await req.json();
  try {
    const storedTodo = await fs.readFile(filePath, "utf-8");
    const arrangedTodo = JSON.parse(storedTodo);

    const filteredTodo = arrangedTodo.filter(
      (todo: any) => todo.id !== targetId
    );

    await fs.writeFile(filePath, JSON.stringify(filteredTodo, null, 2));
    NextResponse.json({ message: "Todo Deleted Successfully", status: 200 });
  } catch (error) {
    NextResponse.json({ message: "Error deleting ", error });
  }
}
