import { signup } from "@/services/apiUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function useRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: signupUser, isPending: isLoading, error } = useMutation({
    mutationFn: signup,
    onSuccess: ({ session, user }) => {
      // With email confirmation enabled Supabase returns no session yet.
      if (!session) {
        toast.success(t("auth.confirmEmail"));
        navigate("/login");
        return;
      }

      queryClient.setQueryData(["user"], user);
      toast.success(t("auth.accountCreated"));
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    signupUser,
    isLoading,
    error,
  };
}
