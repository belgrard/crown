"use client";

import { t } from "@/lib/texts";
import Link from "next/link";
import Input from "./Input";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

export default function LoginPopup({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const showToast = (text: string) => {
    withReactContent(Swal).fire({
      title: text,
      theme: "dark",
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      icon: "error",
      toast: true,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      const { error } = await res.json();
      showToast(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-6 w-[380px] max-w-full relative text-white">
        <button
          className="absolute top-4 p-1.5 bg-gray rounded-xs right-4 text-xl font-bold text-gray-400 hover:text-white hover:bg-gray-800 bg-transparent ease-in-out transition duration-150 cursor-pointer"
          onClick={onClose}
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-center mb-2">
          {t("login.hello")}
        </h2>
        <p className="text-center text-gray-400 mb-4">
          {t("login.description").replace("{0}", "2")}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Input
              placeholder={t("login.username.placeholder")}
              type="text"
              label={t("login.username.label")}
              name="username"
            />
          </div>
          <div>
            <Input
              placeholder={t("login.password.placeholder")}
              type="password"
              label={t("login.password.label")}
              name="password"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition cursor-pointer"
          >
            {t("login.submit")}
          </button>
        </form>

        <div className="text-sm text-center text-gray-400 font-bold mt-4 space-y-2 flex flex-col">
          <Link href="/forgot-password" className="hover:underline">
            <p>{t("login.forgotpassword")}</p>
          </Link>

          <Link onClick={onClose} href="/register" className="hover:underline">
            <p>{t("login.donthaveaccount")}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
