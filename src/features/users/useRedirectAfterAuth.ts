import { useLocation } from "react-router";

// Where to go after login/register: the page that sent the user to /login
// (e.g. /checkout), or home.
export function useRedirectAfterAuth() {
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  // Only allow in-app paths.
  return from?.startsWith("/") && !from.startsWith("//") ? from : "/";
}
