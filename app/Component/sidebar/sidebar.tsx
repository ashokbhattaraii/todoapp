export default function Sidebar() {
  return (
    <>
      <div
        id="sideBarContainer"
        className=" bg-slate-700 mt-0 min-h-screen text-slate-300 "
      >
        <h1 className="text-slate-300 mt-4 ml-3 font-extrabold">TodoLists</h1>
        <div id="subDivide" className="flex flex-col gap-5 p-4 px-8 text-white">
          <p>All Tasks</p>
          <p>Important</p>
          <p>Planned</p>
          <p>Completed</p>
        </div>
      </div>
    </>
  );
}
