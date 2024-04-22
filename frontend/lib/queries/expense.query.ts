/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getFromStorage } from "../storage";
import { ErrorToast } from "../../components/Toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      `${API_URL}/expenses/create`,
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
    if (
      error.response.data.message.includes(
        "Please make sure your database server is running at `aws-0-us-west-1.pooler.supabase.com`:`6543"
      )
    ) {
      ErrorToast(
        "Supabase is not running at it's server. It's a common issue with supabase, please refresh the page and try again"
      );
    }
    throw error.response.data.error;
  }
}

export async function deleteExpense(id: number) {
  try {
    const token = getFromStorage("accessToken");

    await axios.delete(`${API_URL}/expenses/delete/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    });

    return true;
  } catch (error: any) {
    if (
      error.response.data.message.includes(
        "Please make sure your database server is running at `aws-0-us-west-1.pooler.supabase.com`:`6543"
      )
    ) {
      ErrorToast(
        "Supabase is not running at it's server. It's a common issue with supabase, please refresh the page and try again"
      );
    }
    throw error.response.data.error;
  }
}

export async function getExpenses(id: number) {
  try {
    const token = getFromStorage("accessToken");

    const data = await axios.get(`${API_URL}/expenses/get-by-user/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    });

    return data.data.data.expenses;
  } catch (error: any) {
    if (
      error.response.data.message.includes(
        "Please make sure your database server is running at `aws-0-us-west-1.pooler.supabase.com`:`6543"
      )
    ) {
      ErrorToast(
        "Supabase is not running at it's server. It's a common issue with supabase, please refresh the page and try again"
      );
    }
    throw error.response.data.error;
  }
}
