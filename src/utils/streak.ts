export const formatToK = (num: number) => {
  if (num >= 1000) {
    return Number(num / 1000).toFixed(1).replace(".0", "") + 'k';
  }
  return num.toString();
}