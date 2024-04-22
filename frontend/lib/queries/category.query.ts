/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getFromStorage } from "../storage";
import { ErrorToast } from "../../components/Toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createBudget(
  name: string,
  amount: number,
  limit: number,
  userId: number
) {
  const token = getFromStorage("accessToken");

  try {
    const { data } = await axios.post(
      `${API_URL}/categories/create`,
      {
        name,
        amountAllocated: amount,
        amountLimit: limit,
        userId,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
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
    } else {
      ErrorToast(error.response.data.message);
    }
    throw error.response.data.error;
  }
}

export async function updateBudget(
  userId: number,
  id: number,
  name?: string,
  amount?: number,
  limit?: number
) {
  const token = getFromStorage("accessToken");

  try {
    const { data } = await axios.put(
      `${API_URL}/categories/update/${id}`,
      {
        name,
        amountAllocated: amount,
        amountLimit: limit,
        userId,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

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
    } else {
      ErrorToast(error.response.data.message);
    }
    throw error.response.data.error;
  }
}

export async function deleteBudget(id: number) {
  try {
    const token = getFromStorage("accessToken");

    await axios.delete(`${API_URL}/categories/delete/${id}`, {
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
    } else {
      ErrorToast(error.response.data.message);
    }
    throw error.response.data.error;
  }
}

export async function getMyBudgets(id: number) {
  try {
    const token = getFromStorage("accessToken");

    const data = await axios.get(`${API_URL}/categories/get-by-user/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    });

    return data.data.data.category;
  } catch (error: any) {
    if (
      error.response.data.message.includes(
        "Please make sure your database server is running at `aws-0-us-west-1.pooler.supabase.com`:`6543"
      )
    ) {
      ErrorToast(
        "Supabase is not running at it's server. It's a common issue with supabase, please refresh the page and try again"
      );
    } else {
      ErrorToast(error.response.data.message);
    }
    throw error.response.data.error;
  }
}
