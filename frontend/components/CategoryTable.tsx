import { useEffect, useState } from "react";
import { getFromStorage } from "../lib/storage";
import { deleteBudget, getMyBudgets } from "../lib/queries/category.query";
import { ErrorToast } from "./Toast";
import Spinner from "./Spinner";
// import Loader from "../utils/Loader";

export interface Category {
  name: string;
  userId: number;
  allocated: number;
  limit: number;
  id: number;
}
interface CategoriesListProps {
  category: Category;
}

const CategoryTable = ({ category }: CategoriesListProps) => {
  const [deleting, setDeleting] = useState(false);
  const [deletedRowId, setDeletedRowId] = useState(0);

  return (
    <tr className="hover:cursor-pointer border-b border-b-black text-white">
      <td
        onClick={() => {
          window.location.href = `/log-expense/${category.id}/${category.limit}/${category.name}`;
        }}
        className="py-6"
      >
        <h2 className="text-white">{category.name}</h2>
      </td>
      <td>
        <h2>{category.allocated}</h2>
      </td>
      <td>
        <h2>{category.limit}</h2>
      </td>
      <td>
        <div className="flex items-center justify-center space-x-4 w-full">
          <button
            className={`py-[10px] px-4 bg-[#845ecc] text-white text-[14px] font-medium rounded-md`}
            onClick={() => {
              window.location.href = `/update-budget/${category.id}`;
            }}
          >
            Modify
          </button>
          <button
            className={`py-[10px] px-4 bg-[#d00] text-white text-xs rounded-md font-medium text-[14px] flex items-center justify-center`}
            onClick={async () => {
              setDeleting(true);
              setDeletedRowId(category.id);
              const deleted = await deleteBudget(category.id);
              if (deleted) {
                ErrorToast("Budget deleted");
                setDeleting(false);
              }
            }}
          >
            {deleting && category.id === deletedRowId ? <Spinner /> : "Delete"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryTable;
