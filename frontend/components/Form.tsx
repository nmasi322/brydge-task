import React, { useState } from "react";
import { NewBudget } from "../pages/new-budget";
import Spinner from "./Spinner";
import { getFromStorage } from "../lib/storage";
import { createBudget, updateBudget } from "../lib/queries/category.query";
import { ErrorToast, SuccessToast } from "./Toast";

interface FormProps {
  nameLabel: string;
  amountLabel: string;
  limitLabel: string;
  buttonText: string;
  update: boolean;
  budgetId?: number;
}

export default function Form({
  nameLabel,
  amountLabel,
  limitLabel,
  buttonText,
  update,
  budgetId,
}: FormProps) {
  const [budgetInfo, setBudgetInfo] = useState<NewBudget>({
    name: "",
    amount: 0,
    limit: 0,
  });

  const [loader, setLoader] = useState(false);
  const [limitCrossed, setLimitCrossed] = useState(false);

  async function submitFn() {
    setLoader(true);
    const userId = getFromStorage("userId");

    if (update && budgetId) {
      try {
        console.log(budgetInfo);

        const budget = await updateBudget(
          parseInt(userId!),
          budgetId,
          budgetInfo.name,
          budgetInfo.amount,
          budgetInfo.limit
        );
        if (budget) {
          SuccessToast("Budget updated successfully");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      } catch (error) {
        ErrorToast(
          "An error occured while updating your budget, please try again later."
        );

        console.log(error);
      }
    } else {
      try {
        const budget = await createBudget(
          budgetInfo.name,
          budgetInfo.amount,
          budgetInfo.limit,
          parseInt(userId!)
        );
        if (budget) {
          SuccessToast("Budget created successfully");
          setBudgetInfo({ name: "", limit: 0, amount: 0 });
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      } catch (error) {
        ErrorToast(
          "An error occured while creating your budget, please try again later."
        );

        console.log(error);
      }
    }
    setLoader(false);
  }
  return (
    <div>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          submitFn();
        }}
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-200">
            {nameLabel}
          </label>
          <input
            name="name"
            placeholder="e.g Payroll"
            className="input"
            value={budgetInfo.name}
            onChange={(e) =>
              setBudgetInfo({ ...budgetInfo, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-200">
            {amountLabel}
          </label>
          <input
            type="number"
            name="allocated"
            className="input"
            placeholder="934,249"
            value={budgetInfo.amount}
            onChange={(e) =>
              setBudgetInfo({ ...budgetInfo, amount: parseInt(e.target.value) })
            }
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-200">
            {limitLabel}
          </label>
          <input
            type="number"
            name="limit"
            placeholder="593,349"
            value={budgetInfo.limit}
            onChange={(e) => {
              if (parseInt(e.target.value) > budgetInfo.amount) {
                setLimitCrossed(true);
              } else {
                setLimitCrossed(false);
                setBudgetInfo({
                  ...budgetInfo,
                  limit: parseInt(e.target.value),
                });
              }
            }}
            className="input"
            required
          />
          {limitCrossed && (
            <p className="text-red-500 text-sm mt-1">
              Limit cannot exceed the allocated amount
            </p>
          )}
        </div>

        <button
          disabled={limitCrossed}
          type="submit"
          className="w-full text-white bg-[#016DED] font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
        >
          {loader ? <Spinner /> : buttonText}
        </button>
      </form>
    </div>
  );
}
