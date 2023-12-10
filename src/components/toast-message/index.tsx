import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastMessage() {
  return (
    <ToastContainer
      autoClose={4000}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
    />
  );
}
