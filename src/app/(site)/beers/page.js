"use client";

import useSWR from "swr";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import NoData from "@/app/components/NoData";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Beers = () => {
  const [search, setSearch] = useState(null);

  const { data, error } = useSWR(`https://api.punkapi.com/v2/beers`, fetcher);

  const searchBeers = (e) => {
    e.preventDefault();

    alert(search);
  };

  if (error) {
    notFound();
  }

  return !data ? (
    <NoData
      title={"Beers Unavailable"}
      body={"No beers available at the moment, please try again later."}
    />
  ) : (
    <>
      <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:max-w-5xl lg:px-8">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Search Beers
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <form onSubmit={(e) => searchBeers(e)}>
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pr-10 text-neutral-900 ring-1 ring-inset sm:text-sm sm:leading-6"
              aria-invalid="true"
              aria-describedby="email-error"
            />
            {/* <Button type="submit">Submit</Button> */}
          </form>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 id="products-heading" className="sr-only">
            Beers
          </h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {data?.map((item) => (
              <Link key={item.id} href={`/beers/${item.id}`} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width="500"
                    height="500"
                    className="object-contain group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <h3>{item.name}</h3>
                  <p>{item.volume?.value}</p>
                </div>
                <p className="mt-1 text-sm italic text-gray-500 line-clamp-4">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Pagination */}
      {/* <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div className="-mt-px flex w-0 flex-1">
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </a>
        </div>
        <div className="hidden md:-mt-px md:flex">
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            1
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
            aria-current="page"
          >
            2
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            3
          </a>
          <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
            ...
          </span>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            8
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            9
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            10
          </a>
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </a>
        </div>
      </nav> */}
    </>
  );
};

export default Beers;
