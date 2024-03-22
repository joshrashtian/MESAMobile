import { supabase } from "../../../supabase";

export async function getEvents() {
  const { data, error } = await supabase.from("events").select();

  return { data, error };
}
