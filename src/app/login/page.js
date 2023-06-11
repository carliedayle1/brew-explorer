"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session) {
    router.push("/beers");
  }

  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <div className="flex gap-x-3 items-center">
              <img
                className="h-10 w-auto"
                src="/images/beer-mug.png"
                alt="Beer Explorer"
              />
              <h2 className="font-bold text-dark text-3xl">Beer Explorer</h2>
            </div>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#ca8a04",
                    brandAccent: "#fbbf24",
                  },
                },
              },
            }}
            theme="light"
            providers={[]}
            redirectTo={`${location.origin}/auth/callback`}
          />
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/fred-moon-0yqa0rMCsYk-unsplash.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
