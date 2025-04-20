import { t } from "../lib/texts";

export default function IndexPage() {
  return (
    <>
      <div className="bg-gray-800 w-full h-full flex flex-col p-10">
        <div className="flex flex-row gap-3">
          <div className="rounded-full w-[50px] h-[50px] hotel-icon"></div>
          <div className="flex flex-col">
            <p className="font-extrabold text-gray-200">Latest news</p>
            <p className="text-gray-500">
              Keep up to date with the latest hotel gossip.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: t("index.title"),
};
