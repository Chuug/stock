export function setFloat(n) {
   return parseFloat((n).toFixed(2));
}

export function niceFloat(n) {
   return (Math.round(n * 100) / 100).toFixed(2);
}
