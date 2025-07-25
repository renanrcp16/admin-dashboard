type Options = {
  locale?: Intl.LocalesArgument;
  decimals?: number;
};

export function maskNumberInput(input: string, options?: Options): string {
  const decimals = options?.decimals ?? 2;
  let digits = input.replace(/\D/g, "");

  digits = digits.padStart(decimals + 1, "0");

  const fraction = digits.slice(-decimals);

  const whole = digits.slice(0, -decimals).replace(/^0+/, "") || "0";

  const number = parseFloat(`${whole}.${fraction}`);

  return number.toLocaleString(options?.locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
