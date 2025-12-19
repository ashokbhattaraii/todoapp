"use client";
import Image from "next/image";
import Add from "./Component/addarea/add";
import Sidebar from "./Component/sidebar/sidebar";
import Navbar from "./Component/navbar/navbar";
import { useState } from "react";
export default function Home() {
  return (
    <>
      <div>
        <div id="content" className="flex gap-4 md:max-w-7xl max-w-4xl ">
          <Sidebar />
          <Add />
        </div>
      </div>
    </>
  );
}
