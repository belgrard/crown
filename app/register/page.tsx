import Box from "@/components/Box";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="px-10">
      <Box
        title="Create your account!"
        description="Create a free account, and be a part of a fun online world!

"
      >
        <div className="flex flex-row justify-between">
          <div className="w-full">
            <form method="POST">
              <Input
                label="Username"
                description="Your username is what you will have to use, when logging into Crown. It is also what other users will know you as, so make sure you select a username that you like!"
                placeholder="Username"
                id="username"
                type="text"
              />

              <Input
                label="Email"
                description="You will need your email if you were to ever forget your password, so make sure it is something that you remember."
                placeholder="Enter your email"
                id="email"
                type="email"
              />

              <Input
                label="Password"
                description="Your password must contain at least 8 characters. Make sure to use a unique & secure password."
                placeholder="Choose a secure password"
                id="password"
                type="current-pasword"
              />

              <Input
                label="Repeat password"
                placeholder="Repeat your chosen password"
                id="password_confirmation"
                type="current-password"
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
                    I accept the Crown terms & rules.
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="bg-yellow-500 w-full mt-3 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition cursor-pointer"
              >
                Submit
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
