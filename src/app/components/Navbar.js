"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "flowbite-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Beers", href: "/beers" },
];

const authNavigation = [{ name: "Cart", href: "/cart" }];

const Navbar = ({ session, cartCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cart" },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  const pathname = usePathname();

  return (
    <header className="bg-white relative ">
      {/* Header */}
      <nav
        className="fixed top-0 left-0 right-0 mx-auto flex max-w-full items-center justify-between gap-x-6 p-6 lg:px-24 xl:px-32 bg-gradient-to-r from-blue-400 via-sky-300 to-yellow-200 z-10"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">BrewExplorer</span>
            <div className="flex gap-x-3 justify-center content-center">
              <img
                className="h-8 w-auto"
                src="/images/beer-mug.png"
                alt="Web logo"
              />
              <h2 className="text-dark text-medium text-2xl font-bold">
                Brew Explorer
              </h2>
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              as={item.href}
              className={`text-medium font-semibold leading-6 text-gray-900 p-2 
                ${pathname === item.href ? "border-b-2 border-yellow-500" : ""}
                `}
            >
              {item.name}
            </Link>
          ))}
          {session?.user &&
            authNavigation.map((item) => (
              <div className="flex justify-center items-center" key={item.name}>
                <Link
                  href={item.href}
                  as={item.href}
                  className={`text-medium font-semibold leading-6 text-gray-900 p-2 
                ${pathname === item.href ? "border-b-2 border-yellow-500" : ""}
                `}
                >
                  {item.name}
                </Link>
                {item.name === "Cart" && cartCount > 0 && (
                  <Badge color="failure">{cartCount}</Badge>
                )}
              </div>
            ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          {session?.user ? (
            <form action="/auth/signout" method="POST">
              <button
                type="submit"
                className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                Log out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              Log in
            </Link>
          )}

          {/* <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log out
            </button>
          </form> */}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex justify-between items-center gap-x-6">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">BeerExplorer</span>
              <div className="flex justify-center content-center gap-x-3">
                <img
                  className="h-8 w-auto"
                  src="/images/beer-mug.png"
                  alt="Web logo"
                />
                <h2 className="text-dark text-medium text-xl font-bold">
                  Brew Explorer
                </h2>
              </div>
            </a>

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    as={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
                {session?.user &&
                  authNavigation.map((item) => (
                    <div className="flex items-center gap-x-3" key={item.name}>
                      <Link
                        href={item.href}
                        as={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </Link>
                      {item.name === "Cart" && cartCount > 0 && (
                        <Badge color="failure">{cartCount}</Badge>
                      )}
                    </div>
                  ))}
              </div>

              <div className="py-6">
                {session?.user ? (
                  <form action="/auth/signout" method="POST">
                    <button
                      type="submit"
                      className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                    >
                      Log out
                    </button>
                  </form>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
