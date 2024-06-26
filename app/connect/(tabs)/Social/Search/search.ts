import { supabase } from "../../../../../supabase";

export const Search = async (type: string, query: string) => {
  const { data, error } = await supabase
    .from(type)
    .select("*")
    .textSearch(
      type === "posts" ? "title_tags_creator" : "event_search",
      query,
      {
        type: "websearch",
      }
    );

  if (error) {
    console.log(error);
  }

  return { data, error };
};
