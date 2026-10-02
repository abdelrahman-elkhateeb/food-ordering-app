import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import supabase from "@/lib/supabase";

// Keeps the cached ["user"] query in sync with Supabase auth events
// (login, logout, token refresh, other tabs) so the UI never shows stale state.
export function useAuthListener() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(["user"], session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);
}
