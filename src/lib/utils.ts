import { clsx, type ClassValue } from "clsx";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLucideIcon(name: string): LucideIcon {
  const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;
  return iconMap[name] ?? iconMap.Circle;
}
