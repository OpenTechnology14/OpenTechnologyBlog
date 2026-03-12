import { cn } from "@/lib/utils";

const wrapStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "64rem",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
};

export default function PageWrap({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={cn(className)} style={{ ...wrapStyle, ...style }}>
      {children}
    </div>
  );
}
