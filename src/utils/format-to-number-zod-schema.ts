function detectNumberSeparator(numStr: string): "," | "." {
  if (numStr.includes(",") && numStr.includes(".")) {
    const lastComma = numStr.lastIndexOf(",");
    const lastDot = numStr.lastIndexOf(".");
    return lastComma > lastDot ? "," : ".";
  } else if (numStr.includes(",")) {
    return ",";
  } else {
    return ".";
  }
}

export function formatToNumberZodSchema(input: string) {
  const separator = detectNumberSeparator(input);
  const isCommaSeparator = separator === ",";
  const number = isCommaSeparator
    ? input.replaceAll(".", "").replace(",", ".")
    : input.replaceAll(",", "");

  return Number(number);
}
