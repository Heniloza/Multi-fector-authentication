import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, registerUser } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function SignupComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, isAuthChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate, isAuthChecked]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data)).then((res) => {
      console.log(res);
      if (res?.payload?.success) {
        toast.success("Successfully registered");
        navigate("/");
      }
    });
  };
  return (
    <div className="w-screen flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="flex flex-col justify-between w-[400px] px-16 py-16 border gap-6 rounded-md bg-white">
        <div className="flex justify-center items-center">
          <h2 className="font-bold text-3xl">Register</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label>Username</label>
            <input
              type="text"
              {...register("username", { required: "username is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "email is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button className="w-full bg-blue-500 text-white font-semibold hover:bg-gray-500 mt-6 py-2 rounded-md">
            register
          </button>
          <div className="flex justify-center items-center mt-4 gap-2">
            <span>Already have an account?</span>
            <Link
              className="cursor-pointer hover:text-blue-500 hover:underline"
              to="/signin"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupComponent;
