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
        <div className="relative bg-linear-to-br from-slate-900 via-emerald-900 to-green-700 text-white flex flex-col justify-center px-8 py-12 md:px-12 overflow-hidden">

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-16 right-12 w-48 h-48 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-white rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">

            {/* Logo */}
            <img
              src={cookdinLogo}
              alt="CookDin Logo"
              className="w-20 h-25 md:w-24 md:h-34 object-contain mb-6"
            />

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              CookDin
              <span className="block text-green-900">Admin Portal</span>
            </h1>

            {/* Description */}
            <p className="hidden lg:block mt-6 text-white/80 text-sm md:text-base leading-7 max-w-md">
              Access the secure administration dashboard to manage users, chefs,
              bookings, subscriptions, food donations, and platform operations in one place.
            </p>

            {/* Stats */}
            {/* <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <p className="text-2xl md:text-3xl font-bold">24/7</p>
                <p className="text-xs text-white/70 mt-1">Monitoring</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold">100%</p>
                <p className="text-xs text-white/70 mt-1">Secure Access</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold">1</p>
                <p className="text-xs text-white/70 mt-1">Central Dashboard</p>
              </div>
            </div> */}

            {/* Footer */}
            <div className="hidden lg:block mt-5 text-xs text-white/50">
              © 2026 CookDin. All rights reserved.
            </div>

          </div>
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
                    className="w-full outline-none bg-transparent border-none focus:border-green-600"
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
                    className="w-full outline-none bg-transparent"
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