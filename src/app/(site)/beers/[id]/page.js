import SingleBeer from "./single-beer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getBeer(id) {
  const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return undefined;
  }

  return res.json();
}

const Beer = async ({ params: { id } }) => {
  const supabase = createServerComponentClient({ cookies });

  const data = await getBeer(id);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <SingleBeer data={data} session={session} />;
};

export default Beer;
