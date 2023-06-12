"use client";

import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const CartContext = createContext({});

export const CartContextProvider = ({ children }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const insertCart = async (session, data) => {
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

  const removeBeer = async (id) => {
    try {
      const { error } = await supabase.from("cart").delete().eq("id", id);

      if (error) {
        throw error;
      }

      toast.success("Beer removed!");
    } catch (error) {
      toast.error("Error in deleting item in cart");
    }
  };

  return (
    <CartContext.Provider value={{ removeBeer, insertCart }}>
      <ToastContainer />
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
