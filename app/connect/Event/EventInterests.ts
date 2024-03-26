import { ContextProps } from "../../(contexts)/AuthContext";
import { supabase } from "../../../supabase";

export async function addInterest(user: ContextProps, event: string) {
  const { error } = await supabase.from("eventinterest").insert({
    event_id: event,
    user_id: user.user?.id,
    data: {
      name: user.data?.real_name,
      username: user.data?.username,
      major: user.data?.major ? user.data.major : "Undecided",
    },
  });
  if (error) {
    console.error(error);
  }
  return { error };
}

export const onInterestLost = async (user: ContextProps, event: string) => {
  const { data, error } = await supabase
    .from("eventinterest")
    .delete()
    .match({ event_id: event, user_id: user.user?.id });

  return { error };
};
