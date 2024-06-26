import { supabase } from "../../../../../supabase";
import { PollType } from "../Polls";

export async function getQuestions(Props: PollType) {
  if (!Props) {
    const { data, error } = await supabase
      .from("questions")
      .select()
      .order("created_at", { ascending: false });

    return { data, error };
  }

  let filter = { ...Props, correct: undefined };

  delete filter.correct;

  if (!Props.correct) {
    const { data, error } = await supabase
      .from("questions")
      .select()
      .match(filter)
      .is("correct", null)
      .order("created_at", { ascending: false });

    return { data, error };
  } else {
    const { data, error } = await supabase
      .from("questions")
      .select()
      .match(filter)
      .in("correct", [0, 1, 2, 3, 4, 5, 6])
      .order("created_at", { ascending: false });

    return { data, error };
  }
}
