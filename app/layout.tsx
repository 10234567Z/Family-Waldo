import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wally's Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-screen h-screen overflow-x-hidden">
      <body className={`${inter.className} w-full h-full overflow-y-auto`}>
        <nav className="flex items-center justify-center w-full min-h-10 font-semibold my-2">
          <div className="flex items-center justify-left gap-5 w-5/6 min-h-10 bg-slate-400 rounded-md p-2">
            <Image
              src="/waldo.svg"
              alt="Logo"
              width={60}
              height={60}
            />
            <Link href="/leaderboard">
              <h1 className=" text-2xl ">Leaderboard</h1>
            </Link>
            <Link href="/">
              <h1 className=" text-2xl ">Home</h1>
            </Link>
          </div>
        </nav>
        <main className="flex flex-row items-center justify-center w-full flex-1 text-center md:flex-col sm:flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
