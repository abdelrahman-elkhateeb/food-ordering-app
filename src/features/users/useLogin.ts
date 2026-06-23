import { login } from "@/services/apiUsers";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useLogin() {
  const navigate = useNavigate();
  const {
    mutate: loginUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    loginUser,
    isPending,
    error,
  };
}