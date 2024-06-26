import colors from "tailwindcss/colors";

export type ColorKey = keyof typeof colors;

type Shade =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export const hexToRgb = (color: ColorKey, shade1: Shade, shade: number) => {
  const hex = colors?.[color][shade1];
  const result = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
  if (!result) {
    return "";
  }
  return `rgba(${Number.parseInt(result[1], 16)}, ${Number.parseInt(
    result[2],
    16,
  )}, ${Number.parseInt(result[3], 16)}, ${shade / 100})`;
};
