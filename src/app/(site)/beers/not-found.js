"use client";

import NoData from "@/app/components/NoData";

const BeerNotFound = () => {
  return (
    <NoData
      title={"Something went wrong.."}
      body={"Please try again later..."}
    />
  );
};

export default BeerNotFound;
