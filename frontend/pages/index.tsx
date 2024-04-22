import type { NextPage } from "next";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getProfile } from "../lib/queries/auth.query";
import { getMyBudgets } from "../lib/queries/category.query";
import Spinner from "../components/Spinner";
import CategoryTable from "../components/CategoryTable";
import DonughnutChart from "../components/DonughnutChart";
import background from "../assets/bg.png";
import SideBar from "../components/SideBar";
import { ToastContainer } from "react-toastify";

export interface Category {
  name: string;
  id: number;
  userId: number;
  allocated: number;
  limit: number;
}

export interface User {
  email: string;
  id: number;
  name: string;
  totalAllocatedAmount: number;
  balance: number;
  password: string;
}

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [budgets, setBudgets] = useState<Category[] | null>(null);

  useEffect(() => {
    async function runProgram() {
      let userDetails = await getProfile();
      setUser(userDetails);
      const retrievedBudgets = await getMyBudgets(userDetails.id);
      console.log(retrievedBudgets);
      setBudgets(retrievedBudgets);
    }
    runProgram().catch(console.error);
  }, []);

  return (
    <div
      className="lg:min-h-screen"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
      }}
    >
      <ToastContainer />
      {user && budgets ? (
        <>
          <Header user={{ id: user.id, name: user.name, email: user.email }} />

          <div className="lg:grid lg:grid-cols-5">
            <div className="w-full md:col-span-2 lg:col-span-1 max-lg:hidden">
              <SideBar />
            </div>
            <div className="px-4 col-span-4">
              <div
                className={`flex mb-5 space-x-4 w-[${
                  window.innerWidth - 320
                }px]`}
              >
                <h1 className="mt-8 text-[21px] capitalize font-semibold text-white">
                  Welcome, {user.name}
                </h1>
              </div>
              <div className="lg:grid grid-cols-3 gap-4 mb-4 w-full max-lg:space-y-5">
                <div className="rounded-2xl p-5 shadow-xl relative bg-[#060C2B]/60 max-lg:h-40">
                  <h1 className="text-lg font-medium text-white">
                    Total Balance <span className="text-2xl ml-1">💸</span>
                  </h1>
                  <p className="mt-3 text-xl font-medium bottom-6 text-gray-400 absolute">
                    ₦ {user.balance}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#060C2B]/60 p-5 shadow-xl">
                  <h1 className="text-lg font-medium text-white">
                    Budget Categories <span className="text-2xl ml-1">🏠</span>
                  </h1>
                  <div className="flex items-end space-x-2 mt-3">
                    <p className="mt-2 text-white font-semibold text-5xl">
                      {budgets?.length}
                    </p>
                    <p className="text-sm text-gray-400 font-medium">
                      Budget{budgets?.length > 1 && "s"} Created
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#060C2B]/60 p-5 shadow-xl">
                  <h1 className="text-lg font-medium text-white">
                    Budget Allocation <span className="text-2xl ml-1">🗒</span>
                  </h1>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-gray-400 font-normal text-sm">
                        Amount Allocated
                      </h2>
                      <p className="mt-1 text-lg text-white">
                        ₦ {user.totalAllocatedAmount}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-gray-400 font-normal text-sm">
                        Amount Remaining
                      </h2>
                      <p className="mt-2 text-lg text-white">
                        ₦ {user.balance}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:grid grid-cols-5 gap-8 mt-20">
                <div className="col-span-2 max-md:mb-8">
                  <div className="mb-14 max-md:text-center">
                    <h1 className="font-semibold text-white text-xl mb-1">
                      Budgets Allocation Chart
                    </h1>
                    <p className="text-sm text-gray-300 md:max-w-[400px]">
                      This chart gives an insight to how your company has spent
                      your balance in various budget categories
                    </p>
                  </div>
                  <div className="max-md:block w-full max-md:mx-auto">
                    <DonughnutChart
                      budgets={budgets}
                      balance={user.balance.toString()}
                    />
                  </div>
                </div>
                <div className="col-span-3 h-[50vh] overflow-y-scroll">
                  <div>
                    <h1 className="text-center font-semibold text-white text-xl  mb-10">
                      All Budgets
                    </h1>
                  </div>
                  {budgets?.length > 0 ? (
                    <table className="w-full text-black px-5">
                      <tr className="text-[16px] text-left pl-5 border-b-black border-b">
                        <th className="table__head">Budget Name</th>
                        <th className="table__head">Budget Amount</th>
                        <th className="table__head">Budget Limit</th>
                        <th className="table__head text-center">Actions</th>
                      </tr>
                      {budgets?.map((budget, index) => (
                        <CategoryTable key={index} category={{ ...budget }} />
                      ))}
                    </table>
                  ) : (
                    <div>
                      <h1 className="text-center text-white">
                        No budgets yet, click the button in the header to create
                        a budget.
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Home;
