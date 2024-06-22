import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Categories, ApiResponse, Audits } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}