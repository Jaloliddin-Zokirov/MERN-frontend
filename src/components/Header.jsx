import React, { useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center justify-between px-4">
        <div>
          <Link>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden w-full lg:flex items-center justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="search product here..."
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative group flex justify-center">
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => setMenuDisplay((preve) => !preve)}
            >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-10 h-10 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit  p-2 shadow-lg rounded">
                <nav>
                  <Link
                    to={"admin-panel"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay((preve) => !preve)}
                  >
                    Admin Panel
                  </Link>
                </nav>
              </div>
            )}
          </div>

          <div className="relative text-2xl">
            <span>
              <FaShoppingCart />
            </span>
            <div className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5  bg-red-600 text-white rounded-full p-1">
              <p className="text-xs">0</p>
            </div>
          </div>

          <div>
            {user?._id ? (
              <button
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
