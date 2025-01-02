// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }
export function convertToEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return ""; // Ensure the country code is valid

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => char.codePointAt(0) + 127397); // Use codePointAt for Unicode points

  return String.fromCodePoint(...codePoints);
}
