import Image from "next/image";
import avatar from "../assets/avatar.svg";
import logo from "../assets/logo.svg";
import add from "../assets/add.svg";
import { useState } from "react";
import Link from "next/link";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
interface HeaderProps {
  user: { id?: number; name?: string; email?: string };
}

export default function Header({ user }: HeaderProps) {
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image src={logo} width={100} height={50} />
              </Link>
            </div>
          </div>
          <div className="block">
            <div className="flex items-center md:ml-6">
              <div className="mr-2">
                <Link href="/new-budget">
                  <button className="py-[10px] w-32 text-[14px] flex items-center font-medium justify-center text-white bg-gray-900/80 rounded-lg">
                    New Budget
                  </button>
                </Link>
              </div>

              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div
                  onClick={() => setDropdown(!dropdown)}
                  className="hover:cursor-pointer"
                >
                  <Image src={avatar} width={50} height={50} />
                </div>
                <div className={`${!dropdown && "hidden"}`}>
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white pt-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <h1 className="block px-4 pt-1 text-sm capitalize font-semibold text-black">
                      {user.name}
                    </h1>
                    <h1 className="block px-4 pb-3 text-[12px] text-gray-700">
                      {user.email}
                    </h1>
                    <div className="block px-3 py-2 text-sm font-medium rounded-b-md text-gray-400 hover:bg-red-100 hover:text-red-500 duration-500 hover:cursor-pointer">
                      <p
                        onClick={() => {
                          localStorage.removeItem("accessToken");
                          localStorage.removeItem("userId");
                          window.location.href = "/login";
                        }}
                      >
                        Sign out
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
