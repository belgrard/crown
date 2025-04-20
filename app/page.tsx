import Link from "next/link";
import { t } from "../lib/texts";
import { posts } from "@/config/crown";

export default function IndexPage() {
  return (
    <>
      <div className="bg-transparent w-full h-full flex flex-col gap-4">
        <div className="flex flex-row gap-3">
          <div className="rounded-full w-[50px] h-[50px] hotel-icon"></div>
          <div className="flex flex-col">
            <p className="font-extrabold text-gray-200">Latest news</p>
            <p className="text-gray-500">
              Keep up to date with the latest hotel gossip.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {posts.map(({ title, href, author, image }) => {
            return (
              <div
                key={href}
                className="h-[210px] bg-gray-900 w-full rounded shadow relative overflow-hidden transition ease-in-out duration-200 hover:scale-[101%]"
              >
                <Link href={href}>
                  <div
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                    className="article-image"
                  ></div>
                  <div className="mt-4 px-4">
                    <p className="font-semibold text-lg truncate text-gray-200">
                      {title}
                    </p>
                    <div className="flex items-center gap-x-2">
                      <div>img</div>
                      <p className="mt-4 font-semibold text-gray-400">
                        {author}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: t("index.title"),
};
