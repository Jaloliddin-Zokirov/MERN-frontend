import React, { useState } from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const hadleOnChange = (evt) => {
    const { name, value } = evt.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadePic = async (evt) => {
    const file = evt.target.files[0];

    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": " application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.warn("Please check password and confirm password");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="absolute bottom-0 w-full text-xs bg-slate-200 py-4 text-center bg-opacity-80 pb-4 pt-2 cursor-pointer">
                  Upload Photo
                </div>
                <input
                  className="hidden"
                  type="file"
                  onChange={handleUploadePic}
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-200 p-2">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type="name"
                  placeholder="enter your name"
                  required
                  name="name"
                  value={data.name}
                  onChange={hadleOnChange}
                />
              </div>
            </div>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-200 p-2">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type="email"
                  placeholder="enter email"
                  required
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
                  required
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
            </div>

            <div>
              <label>Confirm Password : </label>
              <div className="bg-slate-200 p-2 flex items-center">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={hadleOnChange}
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>

          <p className="my-5">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
