"use client";
import { Search, Plus } from "lucide-react";
import Button from "../button";
import { useFormContext } from "../Context/FormContext";
export default function Navbar() {
  const { searchQuery, setSearchQuery } = useFormContext();
  function handleSearch(value: any) {
    console.log("saerch query", value);
    setSearchQuery(value);
  }
  return (
    <>
      <header className=" fixed left-0 right-0 w-full z-100 bg-slate-900 text-white">
        <div className="flex justify items-center py-4 gap-2">
          <h1 className="text-2xl  font-extrabold ml-4 w-[45%]">All Tasks</h1>
          <div
            id="inputContainer"
            className="mx-auto relative  w-full max-w-sm"
          >
            <div className="absolute inset-y-0  left-0 flex justify-center items-center pl-3 ">
              <Search className="text-slate-500" size={22} />
            </div>
            <input
              type="text"
              className="border border-slate-400 w-full py-2 pl-9 text-white outline-0 rounded bg-slate-800 placeholder:text-slate-500 "
              placeholder="Search Task"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div>
            <Button />
          </div>
        </div>
      </header>
    </>
  );
}
