import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdubXB6aW9nZ3l0bHF6ZWt1eXVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MjE1NDksImV4cCI6MjAyMzA5NzU0OX0.UVy6bZF8L5_ThmyRTZ5jqUZgW-p-GVRc4o9bpxvA2-k";
const supabaseURL = "https://gnmpzioggytlqzekuyuo.supabase.co";

export const supabase = createClient(supabaseURL, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
