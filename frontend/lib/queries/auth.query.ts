/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getFromStorage, saveMultipleItemsToStorage } from "../../lib/storage";

export async function signup(name: string, email: string, password: string) {
  try {
    const { data } = await axios.post("http://localhost:8000/api/auth/signup", {
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
    throw error.response.data.error;
  }
}

export async function login(email: string, password: string) {
  try {
    const { data } = await axios.post("http://localhost:8000/api/auth/login", {
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
    throw error.response.data.message;
  }
}

export async function getProfile() {
  try {
    const token = getFromStorage("accessToken");

    const data = await axios.get("http://localhost:8000/api/auth/me", {
      headers: { Authorization: `bearer ${token}` },
    });

    return data.data.data.user;
  } catch (error: any) {
    if (error.response.data.message === "Unauthorized access: Token expired") {
      window.location.href = "/login";
    }
    console.log(error);
  }
}
