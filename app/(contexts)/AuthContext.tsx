import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "../../supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "expo-router";

export interface ContextProps {
  user: User | undefined;
  data: UserData | undefined;
  signOut: () => void;
  signedIn: () => boolean;
}

export type UserData = {
  id: string;
  created_at: Date;
  username: string;
  role: string;
  real_name: string;
  avatar_url?: string;
  classes?: JSON;
  major?: string;
  boxlist: object[];
  bio?: string;
  widgets?: [
    {
      name: string;
    }
  ];
};

export const AuthContext = createContext<ContextProps>({
  user: undefined,
  data: undefined,
  signOut: () => {
    console.log("Signing out");
    supabase.auth.signOut();
  },
  signedIn: () => {
    return false;
  },
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState();

  const router = useRouter();

  const value = useMemo(() => {
    return {
      user: user,
      data: userData,
      signOut: () => {
        console.log("Signing out");
        supabase.auth.signOut();
        setUser(undefined);
        setUserData(undefined);
      },
      signedIn: () => {
        return !!user;
      },
    };
  }, [user, userData]);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
      console.log("signed in as ", user.email);
    }

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user?.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    console.log("successfully grabbed data");
    setUserData(data);
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session?.user.id);
      if (event === "INITIAL_SESSION" && session?.user) {
        router.replace("/connect/");
      }
      if (event === "SIGNED_IN") {
        router.replace("/connect/");
      } else if (event === "SIGNED_OUT") {
        router.replace("/(auth)");
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const user = useContext(AuthContext);
  return user;
};
