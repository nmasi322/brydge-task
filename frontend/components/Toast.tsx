import "react-toastify/dist/ReactToastify.css";
import { toast, Slide } from "react-toastify";

export function SuccessToast(description: React.ReactNode | string) {
  return toast.success(description, {
    transition: Slide,
    className: "toast",
    hideProgressBar: true,
  });
}

export function ErrorToast(description: React.ReactNode | string) {
  return toast.error(description, {
    transition: Slide,
    className: "toast",
    hideProgressBar: true,
  });
}
