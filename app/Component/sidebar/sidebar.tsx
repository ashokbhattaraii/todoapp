import Button from "../button";

export default function Sidebar() {
  return (
    <>
      <div
        id="sideBarContainer"
        className=" bg-slate-700  min-h-screen w-64  text-slate-300 pt-20 flex flex-col gap-5  "
      >
        <h1 className="text-slate-300 mt-4   font-extrabold">TodoLists</h1>
        <div
          id="subDivide"
          className="flex flex-col gap-2 mt-8   w-full text-white"
        >
          <button className="flex items-center justify-center px-8 gap-6 my-4 border-r-4 border-lime-400 ">
            <span>All Tasks</span>
          </button>

          <button className="flex items-center justify-center px-8 gap-6  my-4  ">
            <span>Pending</span>
          </button>

          <button className="flex items-center justify-center px-8 gap-6  my-4   ">
            <span>Important</span>
          </button>

          <button className="flex items-center justify-center px-8 gap-6  my-4">
            <span>Completed</span>
          </button>
        </div>
      </div>
    </>
  );
}
