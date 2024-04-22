import { useState } from "react";
import { Expense } from "../pages/log-expense/[id]/[limit]/[name]";
import { deleteExpense } from "../lib/queries/expense.query";
import { ErrorToast } from "./Toast";
// import Loader from "../utils/Loader";

interface ExpenseListProps {
  expense: Expense;
}

const ExpenseTable = ({ expense }: ExpenseListProps) => {
  const [deleting, setDeleting] = useState(false);

  return (
    // <div>
    <tr className="border-b border-b-black text-gray-300">
      <td className="py-6">
        <h2>{expense.date}</h2>
      </td>
      <td>
        <h2>{expense.amount}</h2>
      </td>
      <td>
        <h2>{expense.description.slice(0, 40)}</h2>
      </td>
      <td>
        <div className="flex items-center justify-center space-x-4 w-full">
          <button
            className={`py-[10px] px-4 bg-[#d00] text-white text-xs rounded-md font-medium text-[14px]`}
            onClick={async () => {
              setDeleting(true);
              const deleted = await deleteExpense(expense.id);
              if (deleted) {
                ErrorToast("Expense deleted");
                setDeleting(false);
                window.location = window.location;
              }
            }}
          >
            Delete
            {/* {deleting && row.id === deletedRowId ? "Deleting" : "Delete"} */}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ExpenseTable;
