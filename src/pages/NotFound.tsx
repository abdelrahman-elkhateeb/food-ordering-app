import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>

      <Button asChild>
        <Link to="/">Back Home</Link>
      </Button>
    </div>
  );
}