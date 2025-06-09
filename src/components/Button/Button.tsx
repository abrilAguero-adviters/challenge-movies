import { useMemo } from "react";

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  className,
  ...props
}: ButtonProps) => {
  const base =
    "rounded-lg font-medium transition px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-primary";
  const mode = primary
    ? "bg-accent-primary text-white hover:bg-accent-primary/90"
    : "bg-dark-secondary text-white border border-gray-700 hover:bg-dark-tertiary";

  const sizeClass = useMemo(() => {
    let sizeClass = "text-base px-4 py-2";

    if (size === "small") {
      sizeClass = "text-xs px-2 py-1";
    } else if (size === "large") {
      sizeClass = "text-lg px-6 py-3";
    }

    return sizeClass;
  }, [size]);

  return (
    <button
      type="button"
      className={[base, mode, sizeClass, backgroundColor, className].join(" ")}
      {...props}>
      {label}
    </button>
  );
};
