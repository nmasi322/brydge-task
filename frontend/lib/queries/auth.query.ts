/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getFromStorage, saveMultipleItemsToStorage } from "../../lib/storage";
import { ErrorToast } from "../../components/Toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signup(name: string, email: string, password: string) {
  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, {
      name,
      email,
      password,
    });

    const { token, user } = data.data;

    saveMultipleItemsToStorage([
      { key: "accessToken", value: token.accessToken },
      { key: "userId", value: user.id },
      { key: "userName", value: user.name },
      { key: "userEmail", value: user.email },
    ]);

    return user;
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
  }
}

export async function login(email: string, password: string) {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    const { token, user } = data.data;

    saveMultipleItemsToStorage([
      { key: "accessToken", value: token.accessToken },
      { key: "userId", value: user.id },
      { key: "userName", value: user.name },
      { key: "userEmail", value: user.email },
    ]);

    return user;
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
  }
}

export async function getProfile() {
  try {
    const token = getFromStorage("accessToken");

    const data = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `bearer ${token}` },
    });

    return data.data.data.user;
  } catch (error: any) {
    if (error.response.data.message.includes("Unauthorized access")) {
      window.location.href = "/login";
    } else if (
      error.response.data.message.includes(
        "Please make sure your database server is running at `aws-0-us-west-1.pooler.supabase.com`:`6543"
      )
    ) {
      ErrorToast(
        "Supabase is not running at it's server. It's a common issue with supabase, please refresh the page and try again"
      );
    }
    console.log(error);
  }
}
