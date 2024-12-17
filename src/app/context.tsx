"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

interface extendedUser extends User {
  is_subscribed?: boolean;
}

export const UserContext = createContext<{
  user: extendedUser | null;
  loading: boolean;
}>({
  user: null,
  loading: true,
});

const Provider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const supabase = createClient();
  const pathname = usePathname();

  const [user, setUser] = useState<extendedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Dodanie stanu loading

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
      } else {
        setUser(null);
      }

      setLoading(false); // Zakończono ładowanie
    };

    getUserProfile();
  }, [supabase, pathname]);

  return (
    <UserContext.Provider value={{ user: user, loading: loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default Provider;
