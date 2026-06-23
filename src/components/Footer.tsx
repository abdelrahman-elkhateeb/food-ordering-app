export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row">
        <div>
          <h3 className="text-lg font-bold">Foodie</h3>
          <p className="text-sm text-muted-foreground">
            Fresh food delivered to your doorstep.
          </p>
        </div>

        <div className="flex gap-6 text-sm">
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Menu
          </a>

          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>

          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Foodie. All rights reserved.
      </div>
    </footer>
  );
}