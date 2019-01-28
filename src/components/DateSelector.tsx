import * as React from 'react';
import { MenuItem, Select } from '@material-ui/core';

interface DateSelectorProps {
  month: number;
  year: number;
  startingYear?: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export default function dateSelector(props: DateSelectorProps) {
  const { month, year, startingYear = 2018, onMonthChange, onYearChange } = props;

  const today = new Date();
  // get appropriate years for the Year dropdown
  // starting with the year the app was released and every year after
  // todo: could start with the year of the earlier expense
  const currentYear = today.getFullYear();
  const years: number[] = Array<number>(currentYear - startingYear + 1)
    .fill(0)
    .map((_, index) => startingYear + index);

  // get appropriate list of months for the Month dropdown
  // if the year is the current year, filter out any months after the current month
  const currentMonth = today.getMonth();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ].filter((_, index) => year !== currentYear || index <= currentMonth);

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
      <Select value={month} onChange={event => onMonthChange(parseInt(event.target.value, 10))}>
        {months.map((m, index) => (
          <MenuItem key={`month-select-month-${m}`} value={index}>
            {m}
          </MenuItem>
        ))}
      </Select>
      <Select value={year} onChange={event => onYearChange(parseInt(event.target.value, 10))}>
        {years.map(year => (
          <MenuItem key={`year-select-year-${year}`} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
