import React from "react";

export default function SideBar() {
  return (
    <div className={`py-14 px-8 min-h-screen bg-[#111B38]/40 col-span-1`}>
      <div
        onClick={() => (window.location.href = "/")}
        className="flex px-4 rounded-xl items-center space-x-3 duration-300 hover:cursor-pointer hover:bg-slate-500/50 py-3 my-2"
      >
        <div className="w-8 h-8 rounded-xl bg-[#016DED] flex items-center justify-center">
          🏠
        </div>
        <div>
          <h2 className="text-lg text-white">Dashboard</h2>
        </div>
      </div>
      <div
        onClick={() => (window.location.href = "/new-budget")}
        className="flex px-4 rounded-xl items-center space-x-3 duration-300 hover:cursor-pointer hover:bg-slate-500/50 py-3 my-2"
      >
        <div className="w-8 h-8 rounded-xl bg-[#016DED] flex items-center justify-center">
          🗒
        </div>
        <div>
          <h2 className="text-lg text-white">Create New Budget</h2>
        </div>
      </div>
      <a
        href="mailto:edehdivine042@gmail.com"
        className="flex px-4 rounded-xl items-center space-x-3 duration-300 hover:cursor-pointer hover:bg-slate-500/50 py-3 my-2"
      >
        <div className="w-8 h-8 rounded-xl bg-[#016DED] flex items-center justify-center">
          🤙🏽
        </div>
        <div>
          <h2 className="text-lg text-white">Contact</h2>
        </div>
      </a>
      <div
        onClick={() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          window.location.href = "/login";
        }}
        className="flex px-4 rounded-xl items-center space-x-3 duration-300 hover:cursor-pointer hover:bg-red-500/50 py-3 my-2"
      >
        <div className="w-8 h-8 rounded-xl bg-[#016DED] flex items-center justify-center">
          ➡️
        </div>
        <div>
          <h2 className="text-lg text-white">Sign out</h2>
        </div>
      </div>
    </div>
  );
}
