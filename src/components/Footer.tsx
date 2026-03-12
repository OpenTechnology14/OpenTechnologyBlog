export default function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Open Technology. Built with open source.
      </div>
    </footer>
  );
}
