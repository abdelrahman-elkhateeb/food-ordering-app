import { login } from "@/services/apiUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    mutate: loginUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      toast.success(t("auth.welcomeBack"));
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    loginUser,
    isPending,
    error,
  };
}
