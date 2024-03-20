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
  userData: UserData | undefined;
  signOut: () => void;
}

export type UserData = {
  id: string;
  created_at: Date;
  username: string;
  role: string;
  real_name: string;
  avatar_url: string;
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

export const AuthContext = createContext({
  user: undefined,
  data: undefined,
  signOut: () => {},
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
    };
  }, [user, userData]);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      getUserData();
      console.log("signed in as ", user.email);
    }
  };

  const getUserData = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id;

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", userId)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    console.log("successfully grabbed data");
    router.push("/connect/");
    setUserData(data);
  };

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      router.push("/connect/");
    } else if (event === "SIGNED_OUT") {
      router.push("/");
    } else if (event === "PASSWORD_RECOVERY") {
      // handle password recovery event
    } else if (event === "TOKEN_REFRESHED") {
      // handle token refreshed event
    } else if (event === "USER_UPDATED") {
      // handle user updated event
    }
  });

  useEffect(() => {
    getUser();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const user = useContext(AuthContext);
  return user;
};