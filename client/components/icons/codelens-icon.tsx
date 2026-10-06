import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

type CodeLensIconProps = SVGProps<SVGSVGElement> & {
  variant?: "color" | "mono";
};

export function CodeLensIcon({
  className,
  variant = "color",
  ...props
}: CodeLensIconProps) {
  const mono = variant === "mono";

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      {/* rounded tile: solid teal in color, outline only in mono */}
      <rect
        width="64"
        height="64"
        rx="14"
        fill={mono ? "none" : "#12907E"}
        stroke={mono ? "currentColor" : "none"}
        strokeWidth={mono ? 4 : 0}
      />
      {/* ">" chevron */}
      <path
        d="M17 22L29 32L17 42"
        stroke={mono ? "currentColor" : "#FFFFFF"}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* "_" cursor */}
      <path
        d="M35 43H47"
        stroke={mono ? "currentColor" : "#FFFFFF"}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}