export default function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="container text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Open Technology. Built with open source.
      </div>
    </footer>
  );
}
