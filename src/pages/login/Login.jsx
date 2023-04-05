import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import background from "../../asset/image/bg-01.webp";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { authActions } from "../../auth/auth.action";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [error, setError] = useState("");
  const [visibalePass, setVisibalePass] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    authActions()
      .login(data)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        setError(e);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-full h-full flex justify-center items-center p-4 fixed top-0 left-0 right-0 bottom-0"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] rounded-[10px] bg-black h-[90%] sm:px-[55px] sm:pt-[65px] sm:pb-[54px]"
      >
        <p className="font-Popins font-bold text-[39px] text-[#333] leading-[1.2] text-center pb-[49px]">
          Login
        </p>

        <div className="flex  flex-wrap border-b-2 mb-5 pb-[2px] relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-slate-600  after:transition-all after:ease-linear hover:after:w-full after:duration-500">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">
            Username
          </span>
          <div className="w-full flex justify-start items-center h-[55px]">
            <PersonIcon className="text-white" />
            <input
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Must be an Email",
                },
              })}
              style={{
                color: "white",
              }}
              placeholder="Type Your Email"
              className="outline-none border-none text-base bg-transparent p-4 placeholder:font-Popins placeholder:font-semibold text-white w-full"
              type="text"
            />
          </div>
        </div>
        <div>
          {errors.email && (
            <span className="block text-sm font-Popins tracking-wider text-active">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-wrap border-b-2 mb-5 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-slate-600  after:transition-all after:ease-linear hover:after:w-full after:duration-500">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">
            Password
          </span>
          <div className="w-full flex justify-start items-center h-[55px]">
            <LockIcon className="text-white" />
            <input
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*[@$!%*#?&])(?=.*?[0-9]).{8,}$/,
                  message:
                    "Minimum eight characters, at least one letter, one number and one special character",
                },
              })}
              className="w-full text-white outline-none border-none text-base bg-transparent p-4 placeholder:font-Popins placeholder:font-semibold"
              placeholder="Type Your Password"
              type={visibalePass ? "text" : "password"}
            />
            <div
              className="cursor-pointer"
              onClick={() => setVisibalePass(!visibalePass)}
            >
              {visibalePass ? (
                <RemoveRedEyeOutlinedIcon className="text-white" />
              ) : (
                <VisibilityOffOutlinedIcon className="text-white" />
              )}
            </div>
          </div>
        </div>
        <div>
          {errors.password && (
            <span className="block text-sm font-Popins tracking-wider text-active">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="text-right pt-2 pb-8 w-full font-Popins"></div>

        <div className="cursor-pointer flex justify-center items-center rounded-[25px] bg-gradient-to-l from-[#00dbde] via-[#fc00ff] to-[#00dbde] bg-200% hover:bg-right transition-all ease-in-out duration-700">
          <button
            className="uppercase tracking-[2px] w-full p-4 text-white"
            type="submit"
          >
            Login
          </button>
        </div>

        {error && (
          <div className="text-center mt-3 text-red-600">
            <p>{error}</p>
          </div>
        )}
        <div className="text-center mt-10 font-Popins">
          <p className="text-sm text-[#666666]">Or Sign Up Using</p>
          <p
            onClick={() => {
              navigate("/auth/register");
            }}
            className="mt-5 text-[#333] cursor-pointer hover:opacity-90 tracking-widest"
          >
            SIGN UP
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
