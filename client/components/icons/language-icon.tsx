import { Code2 } from "lucide-react";
import type { ComponentType } from "react";
import type { IconType } from "react-icons";
import {
  SiC,
  SiClojure,
  SiCplusplus,
  SiCrystal,
  SiCss,
  SiDart,
  SiDocker,
  SiElixir,
  SiErlang,
  SiFsharp,
  SiGnubash,
  SiGo,
  SiGraphql,
  SiHaskell,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiKotlin,
  SiLua,
  SiMarkdown,
  SiPhp,
  SiPython,
  SiReact,
  SiRuby,
  SiRust,
  SiSass,
  SiScala,
  SiSwift,
  SiToml,
  SiTypescript,
  SiWebassembly,
  SiYaml,
  SiZig,
} from "react-icons/si";

import { cn } from "@/lib/utils";

type LanguageConfig = {
  Icon: IconType;
  bg: string;
  iconClass: string;
};

const LANGUAGE_MAP: Record<string, LanguageConfig> = {
  JavaScript: {
    Icon: SiJavascript,
    bg: "bg-[#F7DF1E]",
    iconClass: "text-[#323330]",
  },
  TypeScript: {
    Icon: SiTypescript,
    bg: "bg-[#3178C6]",
    iconClass: "text-white",
  },
  Python: {
    Icon: SiPython,
    bg: "bg-[#3776AB]",
    iconClass: "text-white",
  },
  Go: {
    Icon: SiGo,
    bg: "bg-[#00ADD8]",
    iconClass: "text-white",
  },
  Rust: {
    Icon: SiRust,
    bg: "bg-[#000000]",
    iconClass: "text-white",
  },
  "C++": {
    Icon: SiCplusplus,
    bg: "bg-[#00599C]",
    iconClass: "text-white",
  },
  C: {
    Icon: SiC,
    bg: "bg-[#A8B9CC]",
    iconClass: "text-[#1b1b1b]",
  },
  HTML: {
    Icon: SiHtml5,
    bg: "bg-[#E34F26]",
    iconClass: "text-white",
  },
  CSS: {
    Icon: SiCss,
    bg: "bg-[#1572B6]",
    iconClass: "text-white",
  },
  // add the rest (Kotlin, Swift, Ruby, PHP, Dart, ...) in the same shape
};

type LanguageIconProps = {
  language: string | null | undefined;
  className?: string;
};

export function LanguageIcon({ language, className }: LanguageIconProps) {
  const config = language ? LANGUAGE_MAP[language] : undefined;

  if (!config) {
    return (
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground",
          className
        )}
      >
        <Code2 className="size-4" />
      </span>
    );
  }

  const { Icon, bg, iconClass } = config;
  const LanguageIconComponent = Icon as unknown as ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;

  return (
    <span
      className={cn(
        "flex size-8 items-center justify-center rounded-lg",
        bg,
        className
      )}
    >
      <LanguageIconComponent
        className={cn("size-4", iconClass)}
        aria-hidden={true}
      />
    </span>
  );
}