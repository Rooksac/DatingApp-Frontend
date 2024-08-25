import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xlyrxkgrlnkvtkbqufkx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhseXJ4a2dybG5rdnRrYnF1Zmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MTczMzgsImV4cCI6MjA0MDA5MzMzOH0.h-0knvwpqOj2Hpp6uBXGMfukY3jh-7t8aLvlc5ChN5M";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

//turn autorefreshtoken and persistsession to false to test session tokens.
//turn authrefreshtoken and presistsession to true for correct functionality.

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
