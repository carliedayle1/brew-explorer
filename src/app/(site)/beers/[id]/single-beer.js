"use client";

import { FaWineBottle } from "react-icons/fa";
import { GiBottleVapors } from "react-icons/gi";
import Image from "next/image";
import Card from "../../../components/Card";

const SingleBeer = ({ data, session }) => {
  const sample = () => {
    console.log(JSON.stringify(data[0]));
  };

  return (
    <div className="h-full bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-7">
              <div className="flex justify-between">
                <h1 className="text-3xl font-medium text-gray-900">
                  {data[0]?.name}
                </h1>
                <p className="text-xl font-medium text-gray-900">
                  {data[0]?.volume?.value}
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
                <Image
                  src={data[0]?.image_url}
                  alt={data[0]?.name}
                  priority
                  width="500"
                  height="500"
                  className="object-contain group-hover:opacity-75"
                />
              </div>
            </div>

            <div className="mt-8 lg:col-span-7">
              <button
                type="button"
                onClick={sample}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-600 px-8 py-3 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Add to cart
              </button>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div
                  className="prose prose-sm mt-4 text-gray-500"
                  dangerouslySetInnerHTML={{ __html: data[0]?.description }}
                />
              </div>

              <section className="mt-10">
                <h2 className="my-3">Ingredients</h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card
                    name={`First Brewed`}
                    description={data[0]?.first_brewed}
                  >
                    <GiBottleVapors
                      className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400 my-1"
                      aria-hidden="true"
                    />
                  </Card>

                  <Card name={`Alcohol by Volume`} description={data[0]?.abv}>
                    <FaWineBottle
                      className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400 my-1"
                      aria-hidden="true"
                    />
                  </Card>
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBeer;
