import { signup } from "@/services/apiUsers";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useRegister() {
  const navigate = useNavigate();

  const { mutate: signupUser, isPending: isLoading, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      console.error(err);
    },
  })

  return {
    signupUser,
    isLoading,
    error
  }
}