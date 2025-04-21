// import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getUserFromToken } from "@/lib/auth";
import CurrencyBar from "@/components/layout/CurrencyBar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserFromToken();

  return (
    <html lang="en" className="bg-gray-900">
      <body
        className={`${poppins.variable} ${poppins.className} antialiased bg-gray-900`}
      >
        {!user ? (
          <Header />
        ) : (
          <CurrencyBar
            duckets={user.currencies.duckets}
            diamonds={user.currencies.diamonds}
            credits={user.currencies.credits}
          />
        )}

        <Navbar />

        <div className="bg-gray-800 text-white px-25 py-8">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
