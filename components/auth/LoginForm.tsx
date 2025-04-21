"use client";

import { t } from "@/lib/texts";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Input from "../ui/Input";

export default function LoginForm() {
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
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <Input
          label={t("login.username.label")}
          placeholder={t("login.username.placeholder")}
          id="username"
          type="text"
          name="username"
        />

        <Input
          label={t("login.password.label")}
          placeholder={t("login.password.placeholder")}
          id="password"
          type="password"
          name="password"
        />

        <button
          type="submit"
          className="bg-yellow-500 w-full mt-3 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition cursor-pointer"
        >
          {t("login.submit")}
        </button>
      </form>
    </div>
  );
}
