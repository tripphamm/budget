export function parseDateParams(yearParam: string, monthParam: string) {
  return {
    // in the url we use 1-indexed months, so we'll convert back to 0-indexed
    // because that's what javascript Date uses
    month: parseInt(yearParam, 10) - 1,
    year: parseInt(monthParam, 10),
  };
}

export function getExpensesURL(year: number, month: number) {
  // add 1 to month to convert to 1-indexed
  return `/expenses/${year}/${month + 1}`;
}
