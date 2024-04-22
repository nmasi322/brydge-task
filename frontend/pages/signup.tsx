import React, { useState } from "react";
import Image from "next/image";
import logo from "../assets/logo.svg";
import { Credentials } from "./login";
import { signup } from "../lib/queries/auth.query";
import Link from "next/link";
import Spinner from "../components/Spinner";
import { ToastContainer } from "react-toastify";

export default function Singup() {
  const [credentials, setCredenials] = useState<Credentials>({
    email: "",
    password: "",
    name: "",
  });

  const [loader, setLoader] = useState(false);

  async function signupUser() {
    setLoader(true);
    try {
      const user = await signup(
        credentials.name!,
        credentials.email,
        credentials.password
      );
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
      <ToastContainer />
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto max-lg:min-h-screen lg:h-screen lg:py-0">
          <div className="mb-6">
            <a href="#" className="flex items-center mb-6">
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
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Create An Account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  signupUser();
                }}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Your Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="e.g John Smith"
                    className="input"
                    value={credentials.name}
                    onChange={(e) =>
                      setCredenials({ ...credentials, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="e.g name@company.com"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredenials({ ...credentials, email: e.target.value })
                    }
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
                    placeholder="••••••••"
                    className="input"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredenials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <button
                  disabled={loader}
                  type="submit"
                  className="w-full text-white bg-[#016DED] font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
                >
                  {loader ? <Spinner /> : "Create an account"}
                </button>
                <p className="text-sm font-medium text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-[#016DED] hover:underline"
                  >
                    Login here
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
