export function parseDateParams(yearParam: string, monthParam: string) {
  return {
    // in the url we use 1-indexed months, so we'll convert back to 0-indexed
    // because that's what javascript Date uses
    month: parseInt(yearParam, 10) - 1,
    year: parseInt(monthParam, 10),
  };
}
