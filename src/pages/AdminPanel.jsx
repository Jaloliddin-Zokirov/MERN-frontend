import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div className="min-h-[calc(100vh-120px)] lg:flex hidden">
      <aside className="min-h-full w-full max-w-60 bg-white customShadow">
        <div className="h-32 grid place-items-center">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/*** navigation */}
        <div>
          <nav className="grid py-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">All users</Link>
            <Link to={"all-product"} className="px-2 py-1 hover:bg-slate-100">Product</Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
