import React from "react";
import { MdEmail, MdLock } from "react-icons/md";

import { useNavigate } from 'react-router-dom'

// form 
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import cookdinLogo from '../../assets/images/cookdin.svg'
import { useAdminLogin } from "../../hooks/apiHooks";

import { showSuccess, showError } from '../../utils/toast';

const AdminLogin = () => {

  const navigate = useNavigate();

  const { mutate, isPending } = useAdminLogin();

  const initialValues = {
    email: "cookdin@example.com",
    password: "cookdin@1234",
  };
  const validationSchema = yup.object({
    email: yup.string().required("Please Enter Your Email"),
    password: yup.string().required("Please Enter Your Password"),
  });

  const { register, control, handleSubmit, reset, setValue, clearErrors,
    formState: { errors, isSubmitting }, } = useForm({
      defaultValues: initialValues,
      resolver: yupResolver(validationSchema),
    });

  const onSubmit = (value) => {
    mutate(value, {
      onSuccess: (response) => {
        if (response?.tokens?.access) {
          const userRole = response.user?.role;
          const user = response.user;

          console.log(userRole);
          console.log(user);

          sessionStorage.setItem("user", JSON.stringify(user));
          // sessionStorage.setItem("user", user);
          sessionStorage.setItem("accessToken", response.tokens.access.token);

          showSuccess("Login Successful!");

          // setTimeout(() => {
            navigate("/admin");
          // }, 1000);
        } else {
          showError("Invalid email or password!");
        }
      },

      onError: (error) => {
        showError("Something went wrong. Please try again!");
        console.error("Login Error:", error);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Side */}
        <div className="bg-linear-to-br from-emerald-900 via-green-800 to-emerald-600 text-white flex flex-col justify-center items-center p-8 md:p-10">

          {/* Logo */}
          <div className="">
            <img
              src={cookdinLogo}
              alt="CookDin Logo"
              className="w-20 h-20 md:w-50 md:h-30 object-contain"
            />
          </div>

          {/* Title */}
          {/* <h1 className="text-2xl md:text-4xl font-bold mt-3 md:mt-6">
            CookDin
          </h1>
          <p className="text-base md:text-xl font-semibold text-emerald-100">
            Admin Panel
          </p> */}

          {/* Desktop only */}
          <div className="hidden md:block w-16 h-1 bg-emerald-300 rounded-full my-5"></div>

          <p className="hidden md:block text-white/80 text-center max-w-sm leading-7">
            Secure access to the CookDin administration dashboard. Manage chefs,
            customers, bookings, food donations, subscriptions, and platform
            operations from one place.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 mt-2">
              Sign in to continue to your CookDin dashboard
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-2 flex items-center border border-gray-300 rounded px-3 py-3">
                  <MdEmail className="text-gray-400 text-xl mr-2" />
                  <input
                    type="email"
                    placeholder="admin@cookdin.com"
                    className="w-full outline-none bg-transparent focus:border-green-600"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email",
                      },
                      onChange: () => clearErrors("email"),
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-2 flex items-center border border-gray-300 rounded px-3 py-3">
                  <MdLock className="text-gray-400 text-xl mr-2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full outline-none bg-transparent focus:border-green-600"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      onChange: () => clearErrors("password"),
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isPending}
                className={`w-full font-semibold py-3 rounded transition duration-300 shadow-lg
                ${isPending
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                  } text-white`}
              >
                {isPending ? "Signing In..." : "Sign In"}
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;