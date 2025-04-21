import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto flex h-14 w-full gap-1 py-10 flex-col items-center justify-center text-sm text-gray-400 bg-gray-900 font-semibold text-[14px]">
      <p>&copy; 2025 - Crown Hotel is a non-profit educational project</p>
      <p>
        Powered by{" "}
        <Link
          href="https://github.com/belgrard/crown"
          className="hover:underline text-gray-300"
          target="_blank"
        >
          CrownCMS
        </Link>{" "}
        with <span className="text-red-200">❤</span>
      </p>
    </footer>
  );
}
