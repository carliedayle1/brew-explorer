"use client";

import NoData from "@/app/components/NoData";

const BeerNotFound = () => {
  return (
    <NoData
      title={"Beer not found"}
      body={
        "The beer page you visited does not exist, please go back to beers page or home."
      }
    />
  );
};

export default BeerNotFound;
