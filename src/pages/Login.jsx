import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// icons
import { MdEmail, MdLock, MdLogin } from "react-icons/md";

// form
import { useForm } from "react-hook-form";

// theme
import theme from '../theme/theme';

// components
import Button from "../components/Button";
import Input from "../components/forms/Input";
import Image from "../components/media/Image";

// assets
const MainLogo = "https://res.cloudinary.com/dyiuqcqg2/image/upload/v1792398894/adminflow1_ntfic8.png";

// utils
import { setAuth } from '../utils/auth';
import { toastify } from '../utils/toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
      name: 'Admin',
      email: "admin@example.com",
      password: "admin1234",
      role: "admin",
      profileImage: "https://res.cloudinary.com/dyiuqcqg2/image/upload/v1792065096/uploads/krp2m9zlevlrzj2pvbvt.jpg",
      isAuthenticated: true,
      isActive: true,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      console.log("Login data:", data);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setAuth(data);
      toastify.success("Login successful!");
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      toastify.error(error?.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 md:py-6">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-md bg-white shadow-xl md:max-h-160">

        {/* left side */}
        <div className={`relative hidden w-1/2 overflow-hidden bg-linear-to-br from-[#AC1E44] via-[#8d1839] to-[#521026] md:block`}>
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-16 -top-16 h-40 w-40 animate-pulse rounded-full bg-white/30 blur-sm" />
            <div className="absolute -right-16 top-10 h-48 w-48 rounded-full bg-white/20" />
            <div className="absolute -bottom-20 left-10 h-56 w-56 animate-pulse rounded-full bg-white/40 blur-sm" />
            <div className="absolute bottom-16 right-10 h-20 w-20 rounded-full bg-white/20" />
            <div className="absolute left-[45%] top-[35%] h-14 w-14 rounded-full bg-white/30" />
            <div className="absolute right-[30%] top-[55%] h-9 w-9 rounded-full bg-white/45" />
          </div>
          <div className="absolute inset-0 bg-[#AC1E44]/50" />
          <div className="relative z-10 flex h-full flex-col p-5 sm:p-6 lg:p-7">
            <Image
              src={MainLogo}
              alt="AdminFlow"
              className="mb-7 h-13 object-contain object-left"
            />
            <div className="mb-7 text-white sm:mb-8">
              <p className="text-xs font-medium text-white/60 sm:text-sm">
                Welcome to AdminFlow
              </p>
              <h1 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-2 max-w-sm text-[11px] leading-5 text-white/70 sm:text-xs">
                Your centralized platform to manage users, products, orders, and monitor your business operations.
              </p>
            </div>
            <div className="w-full max-w-sm rounded-md border border-white/10 bg-white/10 p-3.5 backdrop-blur-md sm:p-4">
              <p className="text-lg font-bold text-white sm:text-xl mb-3">
                Everything in One Place
              </p>
              <p className="mt-1 text-[11px] leading-4 text-white/60 sm:text-xs ">
                Manage your data, track activities, and keep your business running smoothly with AdminFlow.
              </p>
            </div>
            <p className="mt-auto pt-6 text-[10px] text-white/40">
              © {new Date().getFullYear()} AdminFlow. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full items-center justify-center px-5 py-6 sm:px-8 md:w-1/2 md:px-6 md:py-8">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="relative mb-6 overflow-hidden rounded-md bg-linear-to-br from-[#AC1E44] via-[#7F1735] to-[#3B0A1A] p-5 text-white shadow-lg md:hidden">
              
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-sm" />
                <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/10" />
                <div className="absolute right-16 top-20 h-8 w-8 rounded-full bg-white/10" />
              </div>
              <div className="relative z-10">
                <Image
                  src={MainLogo}
                  alt="AdminFlow"
                  className="mb-5 h-10 object-contain object-left"
                />
                <p className="text-xs font-medium text-white/70">
                  Welcome to AdminFlow
                </p>
                <h1 className="mt-1 text-xl font-bold">
                  Admin Dashboard
                </h1>
                <p className="mt-2 max-w-xs text-xs leading-5 text-white/75">
                  Manage users, products, orders, and your business operations in one place.
                </p>
              </div>
            </div>

            {/* Login Heading */}
            <div className="mb-6">
              <h2 className={`text-2xl font-bold ${theme.text}`}>
                Welcome back!
              </h2>
              <p className={`mt-1 text-xs ${theme.textSecondary}`}>
                Sign in to continue to your dashboard.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                labelClassName={`font-bold ${theme.text_primary}`}
                placeholder="Enter your email"
                icon={MdEmail}
                iconClassName={theme.text_primary}
                autoComplete="email"
                error={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              <Input
                label="Password"
                type="password"
                labelClassName={`font-bold ${theme.text_primary}`}
                placeholder="Enter your password"
                icon={MdLock}
                iconClassName={theme.text_primary}
                autoComplete="current-password"
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <Button
                type="submit"
                size="md"
                fullWidth
                icon={MdLogin}
                text="Login"
                loading={isLoading}
                loadingText="Logging in..."
                className={`${theme.bg_primary} ${theme.bg_primary_hover} mt-3`}
              />
            </form>

            {/* Footer */}
            <p className={`mt-6 text-center text-[10px] ${theme.textSecondary}`}>
              © {new Date().getFullYear()} AdminFlow. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;