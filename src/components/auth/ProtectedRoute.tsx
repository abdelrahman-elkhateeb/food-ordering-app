import { Navigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";

import { useUser } from "@/features/users/useUser";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

// Sends logged-out users to /login and brings them back here afterwards.
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isPending } = useUser();
  const location = useLocation();
  const { t } = useTranslation();

  if (isPending) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        {t("common.loading")}
      </p>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return children;
}
