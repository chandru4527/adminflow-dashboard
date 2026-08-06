import React from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock } from "react-icons/md";

import cookdinLogo from '../../assets/images/cookdin.svg'

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
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
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded transition duration-300 shadow-lg cursor-pointer"
              >
                Sign In
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;