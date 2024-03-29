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
  refreshUserData?: () => void;
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
      refreshUserData: () => {
        refetchUserData();
      },
    };
  }, [user, userData]);

  const refetchUserDataWithId = async (id: string | undefined) => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", id)
      .single();

    console.log("successfully grabbed data");
    console.log(!data);
    setUserData(data);
  };

  const refetchUserData = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user?.id)
      .single();

    console.log("successfully grabbed data");
    console.log(!data);
    setUserData(data);
  };

  const getUser = async () => {
    const {
      data: { user: LogInUser },
    } = await supabase.auth.getUser();

    if (LogInUser) {
      setUser(LogInUser);

      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", LogInUser.id)
        .single();

      console.log("successfully grabbed data");
      console.log(data);
      setUserData(data);
    } else {
      setUser(undefined);
      setUserData(undefined);
    }
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
        refetchUserDataWithId(session?.user.id);
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
