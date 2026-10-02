import { logout } from "@/services/apiUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutUser, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.removeQueries({ queryKey: ["user", "isAdmin"] });
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    logoutUser,
    isPending,
    error,
  };
}
