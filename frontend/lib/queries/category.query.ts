/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getFromStorage } from "../storage";

export async function createBudget(
  name: string,
  amount: number,
  limit: number,
  userId: number
) {
  const token = getFromStorage("accessToken");

  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/categories/create",
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
      `http://localhost:8000/api/categories/update/${id}`,
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
    throw error.response.data.error;
  }
}

export async function deleteBudget(id: number) {
  try {
    const token = getFromStorage("accessToken");

    await axios.delete(`http://localhost:8000/api/categories/delete/${id}`, {
      headers: { Authorization: `bearer ${token}` },
    });

    return true;
  } catch (error: any) {
    console.log(error);
    console.log(error.response.data);
    throw error.response.data.error;
  }
}

export async function getMyBudgets(id: number) {
  try {
    const token = getFromStorage("accessToken");

    const data = await axios.get(
      `http://localhost:8000/api/categories/get-by-user/${id}`,
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );

    return data.data.data.category;
  } catch (error: any) {
    console.log(error);
    console.log(error.response.data);
    throw error.response.data.error;
  }
}
