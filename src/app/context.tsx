"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

interface extendedUser extends User {
  is_subscribed?: boolean;
}

export const UserContext = createContext<{ user: extendedUser | null }>({
  user: null,
});

const Provider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUserProfile = async () => {
      const {
        data: { user: sessionUser },
      } = await supabase.auth.getUser();

      if (sessionUser) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        setUser({
          ...sessionUser,
          ...profile,
        });
      }
    };

    getUserProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (
          event === "SIGNED_IN" ||
          event === "SIGNED_OUT" ||
          event === "TOKEN_REFRESHED"
        ) {
          getUserProfile();
        }
      },
    );
  }, [supabase]);

  return (
    <UserContext.Provider value={{ user: user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default Provider;
