import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../globals.css";
import { Lato } from "next/font/google";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Welcome to BrewExplorer",
  description:
    "Discover a world of flavors with BrewExplorer, the ultimate beer exploration application powered by the Punk API. Unleash your taste buds as you navigate through a vast collection of craft beers, uncovering unique brews, tasting notes, and recommendations. Whether you're a seasoned beer enthusiast or just beginning your journey, BrewExplorer is your trusted guide to unlocking the rich tapestry of flavors in the world of craft beer.",
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={lato.className}>
        <Navbar session={session} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
