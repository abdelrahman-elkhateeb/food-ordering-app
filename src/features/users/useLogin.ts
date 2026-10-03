import { login } from "@/services/apiUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { useRedirectAfterAuth } from "@/features/users/useRedirectAfterAuth";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const redirectTo = useRedirectAfterAuth();

  const {
    mutate: loginUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      toast.success(t("auth.welcomeBack"));
      navigate(redirectTo, { replace: true });
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
