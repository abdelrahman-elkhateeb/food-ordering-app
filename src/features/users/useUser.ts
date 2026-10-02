import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getIsAdmin } from "@/services/apiUsers";

export function useUser() {
  const { data: user, isPending, error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const { data: isAdmin = false } = useQuery({
    queryKey: ["user", "isAdmin", user?.id],
    queryFn: () => getIsAdmin(user!.id),
    enabled: !!user,
  });

  return { user, isAdmin, isPending, error };
}
