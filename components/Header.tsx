import { t } from "@/lib/texts";
import Link from "next/link";

export default function Header() {
  return (
    <div
      className="relative flex h-52 w-full items-center justify-center header-bg bg-cover bg-center"
      style={{ backgroundImage: `url(${t("index.header.background")})` }}
    >
      <div className="absolute h-full w-full bg-black/50 z-0"></div>
      <div className="text-white font-bold flex-col justify-center md:w-[600px] z-10">
        <p className="text-center text-xl md:block">
          {t("index.header.description")}
        </p>

        <div className="flex flex-col items-center justify-center gap-x-6 gap-y-4 md:mt-6 md:flex-row md:gap-y-0">
          <button
            type="button"
            className="rounded-full border-2 border-white px-8 py-2 uppercase transition duration-200 cursor-pointer ease-in-out hover:bg-white hover:text-black"
          >
            {t("index.header.login")}
          </button>

          <p className="text-sm uppercase text-opacity-80">
            {t("index.header.or")}
          </p>

          <Link href="/register">
            <button
              type="button"
              className="cursor-pointer uppercase bg-green-700/80 px-8 py-2.5 rounded-full transition ease-in-out duration-200 hover:bg-green-700"
            >
              {t("index.header.register")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
