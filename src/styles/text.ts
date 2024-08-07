export enum Color {
  primary = "#101820",
  secondary = "#FEE715",
}

export enum Size {
  "xs" = "0.75rem",
  "sm" = "0.875rem",
  "base" = "1rem",
  "lg" = "1.125rem",
  "xl" = "1.25rem",
  "2xl" = "1.5rem",
  "3xl" = "1.875rem",
  "4xl" = "2.25rem",
  "5xl" = "3rem",
  "6xl" = "3.75rem",
  "7xl" = "4.5rem",
  "8xl" = "6rem",
  "9xl" = "8rem",
}

export enum Weight {
  "text-100" = "100",
  "text-200" = "200",
  "text-300" = "300",
  "text-400" = "400",
  "text-500" = "500",
  "text-600" = "600",
  "text-700" = "700",
  "text-800" = "800",
  "text-900" = "900",
}

export type TextSize = keyof typeof Size;
export type TextColor = keyof typeof Color;
export type TextWeight = keyof typeof Weight;
