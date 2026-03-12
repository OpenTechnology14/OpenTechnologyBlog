const wrapStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "64rem",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
};

export default function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div style={wrapStyle} className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Open Technology. Built with open source.
      </div>
    </footer>
  );
}
