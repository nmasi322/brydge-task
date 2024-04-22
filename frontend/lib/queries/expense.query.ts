/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getFromStorage } from "../storage";

export async function createExpense(
  date: string,
  amount: number,
  description: string,
  categoryId: number
) {
  console.log(name);
  const token = getFromStorage("accessToken");

  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/expenses/create",
      {
        date,
        amount,
        description,
        categoryId,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    console.log(data);
    return JSON.parse(JSON.stringify(data)).data;
  } catch (error: any) {
    throw error.response.data.error;
  }
}

export async function deleteExpense(id: number) {
  try {
    const token = getFromStorage("accessToken");

    await axios.delete(`http://localhost:8000/api/expenses/delete/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    });

    return true;
  } catch (error: any) {
    console.log(error);
    console.log(error.response.data);
    throw error.response.data.error;
  }
}

export async function getExpenses(id: number) {
  try {
    const token = getFromStorage("accessToken");

    const data = await axios.get(
      `http://localhost:8000/api/expenses/get-by-user/${id}`,
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );

    return data.data.data.expenses;
  } catch (error: any) {
    console.log(error);
    console.log(error.response.data);
    throw error.response.data.error;
  }
}
