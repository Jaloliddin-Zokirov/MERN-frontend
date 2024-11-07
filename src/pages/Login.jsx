import React, { useContext, useState } from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUsersDetails } = useContext(Context);

  const hadleOnChange = (evt) => {
    const { name, value } = evt.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUsersDetails();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icons" />
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-200 p-2">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={hadleOnChange}
                />
              </div>
            </div>
            <div>
              <label>Password : </label>
              <div className="bg-slate-200 p-2 flex items-center">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={hadleOnChange}
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot password ?
              </Link>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>

          <p className="my-">
            Don't have account ?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
