import { createElement } from "react";
import type { LucideProps } from "lucide-react";
import { getLucideIcon } from "@/lib/utils";

export function IconByName({ name, ...props }: { name: string } & LucideProps) {
  const Icon = getLucideIcon(name);
  return createElement(Icon, props);
}
