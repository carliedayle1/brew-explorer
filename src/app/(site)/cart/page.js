import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import BeerCart from "./beer-cart";

const BeerCartPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data: cart } = await supabase.from("cart").select();

  return <BeerCart cart={cart ?? []} />;
};

export default BeerCartPage;
