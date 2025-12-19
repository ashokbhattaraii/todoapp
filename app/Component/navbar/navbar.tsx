import { Search, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <header className="w-full max-w-4xl md:max-w-7xl bg-slate-900 text-white">
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
            />
          </div>
          <div
            id="buttonContainer"
            className="mr-6 relative flex  items-center text-white "
          >
            <Plus className="absolute inset-y-0 top-2 " size={22} />
            <button className="group bg-lime-500 py-2 md:py-3 px-8 rounded w-full leading-none flex hover:bg-lime-600 cursor-pointer transition-transform ease-out duration-200">
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
