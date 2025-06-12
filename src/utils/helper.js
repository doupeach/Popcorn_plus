export function roundToOneDecimal(num) {
  return (Math.round(num * 10) / 10).toFixed(1);
}
