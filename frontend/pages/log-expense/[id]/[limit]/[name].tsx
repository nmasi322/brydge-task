import React, { useEffect, useState } from "react";
import Header from "../../../../components/Header";
import {
  createExpense,
  getExpenses,
} from "../../../../lib/queries/expense.query";
import { useRouter } from "next/router";
import Spinner from "../../../../components/Spinner";
import ExpenseTable from "../../../../components/ExpenseTable";
import { generateAiAdvice } from "../../../../lib/queries/ai.query";
import Chart, { ChartArray } from "../../../../components/Chart";
import { ToastContainer } from "react-toastify";
import { ErrorToast, SuccessToast } from "../../../../components/Toast";
import background from "../../../../assets/bg.png";
import SideBar from "../../../../components/SideBar";
import { getProfile } from "../../../../lib/queries/auth.query";
import { User } from "../../..";

export interface Expense {
  amount: number;
  description: string;
  date: string;
  id: number;
}

export default function LogExpense() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [chartData, setChartData] = useState<ChartArray[]>([]);

  const [loader, setLoader] = useState(false);
  const [aiAdvice, setAiAdvice] = useState("");
  const [tableLoader, setTableLoader] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState({
    amount: 0,
    description: "",
    date: "",
  });

  useEffect(() => {
    async function runProgram() {
      setTableLoader(true);
      let userDetails = await getProfile();
      setUser(userDetails);

      // get budget expenses data
      if (router.query.id) {
        const expensesList = await getExpenses(
          parseInt(router.query.id.toString())
        );
        const dataForChart = expensesList.map((expense: Expense) => [
          expense.date,
          expense.amount,
        ]);
        setChartData(dataForChart);
        setExpenses(expensesList);
        setTableLoader(false);
      }
    }
    runProgram().catch(console.error);
  }, [router.query]);

  useEffect(() => {
    // extract the expenses amount
    const expensesAmount = expenses.map((expense: Expense) => expense.amount);
    //add expenses amount so far
    const expenseSum = expensesAmount.reduce((acc: number, curr: number) => {
      return acc + curr;
    }, 0);

    if (
      router.query.limit &&
      expenseSum > parseInt(router.query.limit.toString())
    ) {
      ErrorToast(
        `Your total expenses of ₦${expenseSum} has exceeded your limit of ₦${router
          .query.limit!}. Try cutting costs next time‼`
      );
    }

    async function name() {
      if (aiAdvice === "" && router.query.limit && router.query.name) {
        const aiAdvice = await generateAiAdvice({
          budgetAmount: parseInt(router.query.limit.toString()),
          budgetName: router.query.name.toString(),
          amountSpent: expenseSum,
        });
        setAiAdvice(aiAdvice);
      }
    }

    name().catch(console.error);
  }, [expenses, router.query]);

  async function create() {
    setLoader(true);
    try {
      const expense = await createExpense(
        expenseDetails.date,
        expenseDetails.amount,
        expenseDetails.description,
        parseInt(router.query.id?.toString()!)
      );
      if (expense) {
        SuccessToast("Expense created successfully");
        setExpenseDetails({ date: "", description: "", amount: 0 });
        window.location = window.location;
      }
    } catch (error) {
      ErrorToast(
        "An error occured while creating your expense, please try again later."
      );
      console.log(error);
    }
    setLoader(false);
  }

  return (
    <div
      className="min-h-screen pb-10"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
      }}
    >
      <ToastContainer />
      {user && expenses ? (
        <>
          <Header user={{ id: user.id, name: user.name, email: user.email }} />

          <div className="lg:grid lg:grid-cols-5">
            <div className="w-full md:col-span-2 lg:col-span-1 max-lg:hidden">
              <SideBar />
            </div>
            <div className="px-8 col-span-4">
              <div className="md:grid grid-cols-2 gap-8">
                <div className="max-md:mb-9 max-md:mt-5">
                  <div className="mb-10">
                    <h1 className="text-xl text-white font-semibold mb-5">
                      Expenses Summary
                    </h1>
                  </div>
                  {chartData.length < 1 ? (
                    <div>
                      <h1 className="text-white text-center text-lg">
                        No available data
                      </h1>
                    </div>
                  ) : (
                    <Chart incomingData={chartData} />
                  )}
                </div>
                <div>
                  <div>
                    <h1 className="text-xl text-white font-semibold mb-5">
                      Log an expense
                    </h1>
                  </div>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      create();
                    }}
                  >
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-200">
                        Date
                      </label>
                      <input
                        name="date"
                        type="date"
                        placeholder="Enter Date the expense was made"
                        className="input"
                        value={expenseDetails.date}
                        onChange={(e) => {
                          setExpenseDetails({
                            ...expenseDetails,
                            date: e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-200">
                        Description
                      </label>
                      <input
                        name="description"
                        type="text"
                        placeholder="Describe what the expense was used for.."
                        className="input"
                        value={expenseDetails.description}
                        onChange={(e) => {
                          setExpenseDetails({
                            ...expenseDetails,
                            description: e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-200">
                        Amount
                      </label>
                      <input
                        name="amount"
                        type="number"
                        placeholder="How much was spent on this expense?"
                        className="input"
                        value={expenseDetails.amount}
                        onChange={(e) => {
                          setExpenseDetails({
                            ...expenseDetails,
                            amount: parseInt(e.target.value),
                          });
                        }}
                        required
                      />
                    </div>

                    <button
                      disabled={loader}
                      type="submit"
                      className="w-full text-white bg-[#016DED] font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
                    >
                      {loader ? <Spinner /> : "Log Expense"}
                    </button>
                  </form>
                </div>
              </div>
              <div className="md:flex flex-row-reverse w-full my-10 gap-9">
                <div className="p-5 h-[40vh] overflow-y-scroll w-full md:w-[50%]">
                  {!tableLoader ? (
                    expenses && expenses.length > 0 ? (
                      <table className="w-full text-black px-5">
                        <tr className="text-[16px] text-left pl-5 border-b-black border-b">
                          <th className="table__head">Date</th>
                          <th className="table__head">Amount</th>
                          <th className="table__head">Description</th>
                          <th className="table__head text-center">Action</th>
                        </tr>
                        {expenses?.map((expense) => (
                          <ExpenseTable expense={{ ...expense }} />
                        ))}
                      </table>
                    ) : (
                      <div>
                        <h1 className="text-white text-center text-lg">
                          No available data
                        </h1>
                      </div>
                    )
                  ) : (
                    tableLoader && (
                      <div className="flex items-center justify-center pt-14">
                        <Spinner />
                      </div>
                    )
                  )}
                </div>
                <div className="my-5 w-full md:w-[50%]">
                  <h1 className="text-xl text-white font-semibold mb-5">
                    ✨ AI Summary
                  </h1>
                  <div>
                    {aiAdvice ? (
                      <p
                        className="text-gray-200"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {aiAdvice}
                      </p>
                    ) : (
                      <div className="flex items-center justify-center pt-14">
                        <Spinner />
                      </div>
                    )}
                  </div>
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
}
