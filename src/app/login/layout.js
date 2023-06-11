import "../globals.css";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: "400" });

// export const metadata = {
//   title: "Welcome to BrewExplorer",
//   description:
//     "Discover a world of flavors with BrewExplorer, the ultimate beer exploration application powered by the Punk API. Unleash your taste buds as you navigate through a vast collection of craft beers, uncovering unique brews, tasting notes, and recommendations. Whether you're a seasoned beer enthusiast or just beginning your journey, BrewExplorer is your trusted guide to unlocking the rich tapestry of flavors in the world of craft beer.",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`h-full ${lato.className}`}>{children}</body>
    </html>
  );
}
