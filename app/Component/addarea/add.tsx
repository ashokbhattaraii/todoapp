import { Cross } from "lucide-react";
export default function Add() {
  return (
    <>
      <div className="flex w-full justify-center items-center">
        <div className="flex items-center justify-center">
          <img src="nolist.png" alt="" className=" " />
        </div>
        <div
          id="addNewListContainer"
          className="fixed inset-0 flex justify-center items-center bg-slate-800/50 text-white"
        >
          <form className="bg-slate-800 backdrop-blur-2xl p-6 rounded">
            <div id="heading" className="flex justify-between gap-6 ">
              <h1 className="text-3xl font-extrabold">CREATE NEW TASK</h1>
              <Cross className="ml-auto  rounded-full bg-lime-400" size={30} />
            </div>
            <div id="task" className="my-4">
              <span>TASK NAME</span>
              <input
                type="text"
                className="border outline-0 rounded border-slate-500 w-full pl-4 py-3 my-4 bg-slate-700 text-slate-400"
                placeholder="Todo task..."
              />
            </div>
            <div className="flex gap-2 justify-between">
              <div id="date" className="flex flex-col m">
                <span className="mb-4">DATE</span>
                <input
                  type="date"
                  className="border outline-0 pl-4 py-3 rounded border-slate-500 text-slate-400 bg-slate-800"
                />
              </div>
              <div id="cate" className="flex flex-col">
                <span className="mb-4">Categroty</span>
                <select
                  name=""
                  id=""
                  className="border outline-0 pl-4 py-3 rounded border-slate-500 text-slate-400 bg-slate-800"
                >
                  <option value="1">Hello</option>
                  <option value="1">Hello</option>
                  <option value="1">Hello</option>
                </select>
              </div>
            </div>
            <button className="flex justify-center items-center mx-auto  py-2 px-4 mt-4 w-[80%] rounded bg-lime-500 text-black outline-0">
              SAVE TASK
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
