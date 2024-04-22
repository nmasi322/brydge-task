import React, { useState } from "react";
import Image from "next/image";
import logo from "../assets/logo.svg";
import { login } from "../lib/queries/auth.query";
import Link from "next/link";
import Spinner from "../components/Spinner";

export interface Credentials {
  email: string;
  password: string;
  name?: string;
}

export default function Login() {
  const [credentials, setCredenials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const [loader, setLoader] = useState(false);

  async function loginUser() {
    setLoader(true);
    try {
      const user = await login(credentials.email, credentials.password);
      if (user) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  }
  return (
    <div>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="mb-6">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold"
            >
              <Image
                className="w-8 h-8 border-2 border-white"
                src={logo}
                width={100}
                height={20}
                alt="logo"
              />
            </a>
            <p className="text-white text-sm italic">Manage your finances...</p>
          </div>
          <div className="w-full  bg-gray-800 border-gray-700 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Login to your Account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  loginUser();
                }}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredenials({ ...credentials, email: e.target.value })
                    }
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="••••••••"
                    className="input"
                    required
                    onChange={(e) =>
                      setCredenials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={loader}
                  className="w-full text-white bg-[#016DED] font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
                >
                  {loader ? <Spinner /> : "Login"}
                </button>
                <p className="text-sm font-medium text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-[#016DED] hover:underline"
                  >
                    Signup here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
