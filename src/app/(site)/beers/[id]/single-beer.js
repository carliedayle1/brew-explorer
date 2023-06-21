"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { toast, ToastContainer } from "react-toastify";
import { ImSpoonKnife } from "react-icons/im";
import { BsCheck2Circle } from "react-icons/bs";
import { Card, Table } from "flowbite-react";
import { useRouter, notFound } from "next/navigation";

const SingleBeer = ({ data, session }) => {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!data) {
    notFound();
  }

  const insertCart = async () => {
    try {
      setLoading(true);

      let { error } = await supabase.from("cart").insert({
        user_id: session?.user?.id,
        beer: data[0],
      });

      if (error) throw error;

      toast.success("Beer cart updated!");
    } catch (error) {
      toast.error("Error inserting the data!");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <ToastContainer />
      <div className="h-full bg-white">
        <div className="pb-16 pt-6 sm:pb-24">
          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 mb-10">
              <div className="lg:col-span-7">
                <div className="flex justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {data[0]?.name}
                  </h1>
                  <p className="text-xl font-bold text-gray-900">
                    {data[0]?.volume?.value} {data[0]?.volume.unit}
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  <h2 className="text-dark font-bold text-xl tracking-widest">
                    "{data[0]?.tagline}"
                  </h2>
                </div>
              </div>

              <div className="mt-8 lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Beer Image</h2>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                  {data[0]?.image_url !== null ? (
                    <Image
                      src={data[0]?.image_url}
                      alt={data[0]?.name}
                      priority
                      width="500"
                      height="500"
                      placeholder="blur"
                      blurDataURL={data[0]?.image_url}
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
              </div>

              <div className="mt-8 lg:col-span-7">
                {session?.user ? (
                  <button
                    type="button"
                    onClick={insertCart}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-600 px-8 py-3 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                ) : (
                  <Link
                    href="/login"
                    as="/login"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-600 px-8 py-3 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </Link>
                )}

                <div className="mt-10">
                  <h2 className="text-xl font-bold text-gray-900">
                    Description
                  </h2>

                  <div
                    className="prose prose-sm mt-4 text-gray-900 text-medium"
                    dangerouslySetInnerHTML={{ __html: data[0]?.description }}
                  />
                </div>
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-gray-900">
                    Brewer Tips
                  </h2>

                  <div
                    className="prose prose-sm mt-4 text-gray-900 text-medium"
                    dangerouslySetInnerHTML={{ __html: data[0]?.brewers_tips }}
                  />
                </div>

                <section className="mt-10">
                  <h2 className="my-3 font-bold text-xl">Ingredients</h2>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <ul className="my-7 space-y-3">
                        <h5 className="mb-4 text-2xl font-bold dark:text-white text-gray-900">
                          Malt
                        </h5>
                        {data[0]?.ingredients?.malt.map((item, key) => (
                          <li className="flex space-x-3" key={key}>
                            <BsCheck2Circle className=" text-yellow-300" />
                            <span className="text-base font-normal leading-tight dark:text-white text-gray-900">
                              {item.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                    <Card>
                      <ul className="my-7 space-y-3">
                        <h5 className="mb-4 text-2xl font-bold dark:text-white text-gray-900">
                          Hops
                        </h5>
                        {data[0]?.ingredients?.hops.map((item, key) => (
                          <li className="flex space-x-3" key={key}>
                            <BsCheck2Circle className=" text-yellow-300" />
                            <span className="text-base font-normal leading-tight dark:text-white text-gray-900">
                              {item.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                    <Card>
                      <ul className="my-7 space-y-3">
                        <h5 className="mb-4 text-2xl font-bold dark:text-white text-gray-900">
                          Yeast
                        </h5>
                        <li className="flex space-x-3">
                          <BsCheck2Circle
                            className="text-yellow-300"
                            size={30}
                          />
                          <span className="text-base font-normal leading-tight dark:text-white text-gray-900">
                            {data[0]?.ingredients?.yeast}
                          </span>
                        </li>
                      </ul>
                    </Card>
                  </div>
                </section>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Additional Info
                </h2>
                <Table hoverable>
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-neutral-200 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white font-bold">
                      <Table.Cell>Alcohol by Volume (ABV)</Table.Cell>
                      <Table.Cell>{data[0]?.abv}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-neutral-200 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white font-bold">
                      <Table.Cell>
                        International Bitterness Units (IBU)
                      </Table.Cell>
                      <Table.Cell>{data[0]?.ibu}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-neutral-200 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white font-bold">
                      <Table.Cell>Target Final Gravity (FG)</Table.Cell>
                      <Table.Cell>{data[0]?.target_fg}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-neutral-200 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white font-bold">
                      <Table.Cell>Target Orignal Gravity (OG)</Table.Cell>
                      <Table.Cell>{data[0]?.target_og}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-neutral-200 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white font-bold">
                      <Table.Cell>European Brewery Convention (EBC)</Table.Cell>
                      <Table.Cell>{data[0]?.ebc}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-neutral-200 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white font-bold">
                      <Table.Cell>Standard Reference Method (SRM)</Table.Cell>
                      <Table.Cell>{data[0]?.srm}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-neutral-200 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white font-bold">
                      <Table.Cell>Attenuation Level</Table.Cell>
                      <Table.Cell>{data[0]?.attenuation_level}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Food Pairings
                </h2>
                <Table hoverable>
                  <Table.Body className="divide-y">
                    {data[0]?.food_pairing.map((item, key) => (
                      <Table.Row
                        key={key}
                        className="bg-neutral-200 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                      >
                        <Table.Cell className="text-xl flex gap-x-3 items-center">
                          <ImSpoonKnife
                            className="text-yellow-900 dark:text-yellow-300"
                            size={20}
                          />
                          <p>{item}</p>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBeer;
