"use client";

import useSWR from "swr";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import NoData from "@/app/components/NoData";
import { toast, ToastContainer } from "react-toastify";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import LoaderSpinner from "@/app/components/LoaderSpinner";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Beers = () => {
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 6;

  const { data, error, isLoading } = useSWR(
    debounceSearch === ""
      ? `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${PER_PAGE}`
      : `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${PER_PAGE}&beer_name=${debounceSearch}`,
    fetcher
  );

  const handleOnChange = useCallback(({ target: { value } }) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const onPageChange = (page) => {
    if (page <= 0) {
      return toast.error("You can't go back any further.");
    }

    if (data && data.length <= PER_PAGE) {
      return toast.error("No more entries");
    }
    setCurrentPage(page);
  };

  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => {
      clearTimeout(timerID);
    };
  }, [search, currentPage]);

  if (error) {
    notFound();
  }

  return !data && !isLoading ? (
    <NoData
      title={"Beers Unavailable"}
      body={"No beers available at the moment, please try again later."}
    />
  ) : (
    <>
      <ToastContainer />
      <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:max-w-5xl lg:px-8">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Search Beers
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={handleOnChange}
            className="block w-full rounded-md border-0 py-1.5 pr-10 text-neutral-900 ring-1 ring-inset sm:text-sm sm:leading-6"
            aria-invalid="true"
            aria-describedby="email-error"
          />
        </div>
      </div>

      <div className="flex items-center justify-center text-center mb-4 mt-8">
        <button
          className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-white bg-slate-400 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white gap-x-2"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <HiArrowLeft />
          <span>Previous</span>
        </button>
        <button
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-400 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white gap-x-2"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
          <HiArrowRight />
        </button>
      </div>

      {!data && isLoading ? (
        <LoaderSpinner />
      ) : (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 id="products-heading" className="sr-only">
              Beers
            </h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {data?.map((item) => (
                <Link
                  key={item?.id}
                  href={`/beers/${item?.id}`}
                  className="group"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                    {item?.image_url ? (
                      <Image
                        src={item?.image_url}
                        alt={item?.name}
                        width="500"
                        height="500"
                        priority
                        placeholder="blur"
                        blurDataURL={item?.image_url}
                        className="object-contain group-hover:opacity-75"
                      />
                    ) : (
                      <img
                        src={`https://placehold.co/400x600?text=No+image+available`}
                        alt={data[0]?.name}
                        priority
                        width="500"
                        height="500"
                        className="object-contain group-hover:opacity-75"
                      />
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                    <h3 className="font-bold text-lg">{item?.name}</h3>
                    <p>
                      {item?.volume?.value} {item?.volume?.unit}
                    </p>
                  </div>
                  <p className="mt-1 text-sm italic text-gray-500 line-clamp-4">
                    {item?.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Beers;
