import React from "react";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import { useRouter } from "next/router";
import Form from "../../components/Form";
import { ToastContainer } from "react-toastify";

export default function UpdateBudget() {
  const router = useRouter();

  return (
    <div>
      <ToastContainer />
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto max-lg:min-h-screen lg:h-screen lg:py-0">
          <div className="mb-6">
            <a href="#" className="flex items-center justify-center mb-6">
              <Image
                className="w-8 h-8 border-2 border-white"
                src={logo}
                width={100}
                height={20}
                alt="logo"
              />
            </a>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-200 md:text-2xl">
              Update Budget Category
            </h1>
          </div>
          <div className="w-full bg-gray-800 border-gray-700 rounded-lg border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                  Hello,
                </h1>
                <p className="text-gray-300 text-sm mb-6">
                  Wanna make some changes? Go ahead.
                </p>
              </div>

              <div>
                <Form
                  nameLabel="Update Budget Name"
                  amountLabel="Update Amount Allocated"
                  limitLabel="Update Allocation Limit"
                  buttonText="Update Budget"
                  update={true}
                  budgetId={parseInt(router.query.id?.toString()!)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
