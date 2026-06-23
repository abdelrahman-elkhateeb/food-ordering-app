import { logout } from "@/services/apiUsers";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useLogout() {
  const navigate = useNavigate();

  const { mutate: logoutUser, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (err) => {
      console.error(err);
    },
  })

  return {
    logoutUser,
    isPending,
    error
  }
}