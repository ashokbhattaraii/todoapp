"use client";
import {
  Menu,
  LayoutDashboard,
  Star,
  Calendar,
  Hourglass,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { useFormContext } from "../Context/FormContext";

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { filter, setFilter, sideSelected, setSideSelected } = useFormContext();

  const selectedClass =
    "border-r-4 border-lime-400 bg-slate-600/50 text-lime-400";
  const defaultClass = "text-slate-400 hover:bg-slate-800 hover:text-white";

  const menuItems = [
    { name: "All Tasks", icon: <LayoutDashboard size={24} /> },
    { name: "Important", icon: <Star size={24} /> },
    { name: "Pending", icon: <Hourglass size={24} /> },
    { name: "Completed", icon: <CheckCircle size={24} /> },
  ];

  return (
    <div
      className={`fixed bg-slate-700/70 min-h-screen flex flex-col pt-10 transition-all  backdrop-blur-2xl duration-300 ease-in-out shrink-0 ${
        menuOpen ? "w-64" : "w-20"
      }`}
    >
      <div
        className={`flex items-center mb-10 px-6 ${
          menuOpen ? "justify-between" : "justify-center"
        }`}
      >
        {menuOpen && (
          <div className="mt-15">
            <h1 className="text-slate-300 font-extrabold text-xl truncate">
              TodoLists
            </h1>
          </div>
        )}
        <Menu
          size={32}
          className="text-slate-300 mt-15 cursor-pointer hover:text-lime-400 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      <div className="flex flex-col w-full">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setFilter(item.name);
              setSideSelected(item.name);

              console.log(item.name, typeof item.name);
            }}
            className={`flex items-center py-4 transition-all ${
              menuOpen ? "px-8 gap-6" : "justify-center"
            } ${filter === item.name ? selectedClass : defaultClass}`}
            title={!menuOpen ? item.name : ""}
          >
            <div className="">{item.icon}</div>
            {menuOpen && (
              <span className="font-medium truncate">{item.name}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
