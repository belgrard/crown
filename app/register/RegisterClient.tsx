"use client";

import Box from "@/components/Box";
import Input from "@/components/Input";
import { t } from "@/lib/texts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function RegisterPage() {
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
    const passwordRepeat = formData.get("password_confirmation");
    const email = formData.get("email");
    const terms = formData.get("terms");

    if (passwordRepeat !== password) {
      return showToast(t("register.form.password.dontmatch"));
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email, terms }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      const { error } = await res.json();
      showToast(error);
    }
  };

  return (
    <div className="px-10">
      <Box
        title={t("register.box.title")}
        description={t("register.box.description")}
      >
        <div className="flex flex-row justify-between">
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <Input
                label={t("register.form.username.label")}
                description={t("register.form.username.description")}
                placeholder={t("register.form.username.placeholder")}
                id="username"
                type="text"
                name="username"
              />

              <Input
                label={t("register.form.email.label")}
                description={t("register.form.email.description")}
                placeholder={t("register.form.email.placeholder")}
                id="email"
                type="email"
                name="email"
              />

              <Input
                label={t("register.form.password.label")}
                description={t("register.form.password.description")}
                placeholder={t("register.form.password.placeholder")}
                id="password"
                type="password"
                name="password"
                minLength={8}
              />

              <Input
                label={t("register.form.password.confirmation.label")}
                placeholder={t(
                  "register.form.password.confirmation.placeholder"
                )}
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                minLength={8}
              />

              <div className="mt-4 rounded-md p-4 flex flex-col gap-y-1 bg-gray-800">
                <div className="flex items-center gap-x-3">
                  <input
                    id="terms"
                    type="checkbox"
                    name="terms"
                    className="rounded ring-0 focus:ring-0"
                  />
                  <Link
                    className="text-sm font-bold text-gray-700 hover:text-gray-900 hover:underline dark:hover:text-gray-300 dark:text-gray-500"
                    href="/"
                  >
                    {t("register.form.terms")}
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="bg-yellow-500 w-full mt-3 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition cursor-pointer"
              >
                {t("register.form.submit")}
              </button>
            </form>
          </div>

          <div className="block relative w-full">
            <Image
              className="opacity-50 absolute -right-3 -bottom-3"
              src="/assets/hotel.png"
              alt="hotel"
              height={500}
              width={500}
            ></Image>
          </div>
        </div>
      </Box>
    </div>
  );
}
