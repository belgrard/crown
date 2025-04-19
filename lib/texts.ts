import texts from "@/config/texts.json";

export function t(path: string): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return path.split(".").reduce((a, key) => a?.[key], texts as any) || "";
}
