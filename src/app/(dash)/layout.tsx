import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import "../globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "Best Schools",
  description: "the worlds best school manager",
};
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} font-kenit-black ${geistMono.variable} font-sans px-2 antialiased`}
      >
        <div className="h-screen flex bg-white">
          <div className="w-[13%] md:w-[9%] lg:w-[19%] xl:w-[15%] p-3">
            <Link
              href="/"
              className="flex justify-center lg:justify-start items-center"
            >
              <Image
                src="/logo.png"
                alt="logo"
                width="32"
                height="32"
                className="min-h-8"
              />
              <span className="hidden lg:block text-lg font-extrabold text-blue-800">
                eeworks
              </span>
            </Link>
            <Menu />
          </div>
          <div className="w-[87%] md:w-[91%] lg:w-[81%] xl:w-[85%] bg-slate-100 flex flex-col overflow-y-scroll scrollbar">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
