"use client";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Lato } from "next/font/google";
import { usePathname } from "next/navigation";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Welcome to BrewExplorer",
  description:
    "Discover a world of flavors with BrewExplorer, the ultimate beer exploration application powered by the Punk API. Unleash your taste buds as you navigate through a vast collection of craft beers, uncovering unique brews, tasting notes, and recommendations. Whether you're a seasoned beer enthusiast or just beginning your journey, BrewExplorer is your trusted guide to unlocking the rich tapestry of flavors in the world of craft beer.",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return pathname === "/login" ? (
    children
  ) : (
    <html lang="en">
      <body className={lato.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
