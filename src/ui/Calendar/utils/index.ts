import moment from "moment";
import { CalendarDates } from "../types";

export const getAllDatesInMonth = (timestamp: Date) => {
  const year = moment(timestamp).format('YYYY');
  const month = moment(timestamp).format('MM');

  const startOfMonth = moment(moment(`${year}-${month}-01`).format('YYYY-MM-DD')).startOf('month');

  const startOfMonthDay = startOfMonth.day();
  const startDayOfWeek = startOfMonthDay === 0 ? 6 : startOfMonthDay - 1;

  const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
  const datesArray = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    datesArray.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    datesArray.push(moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('YYYY-MM-DD'));
  }

  return datesArray;
};

export const getAllDatesInWeek = (timestamp: Date) => {
  const date = moment.utc(timestamp);
  const weekDates = [];

  const startOfWeek = date.clone().startOf('isoWeek');
  const startOfWeekSub2 = startOfWeek.clone().startOf('isoWeek').subtract('week', 2);
  for (let i = 0; i < 7; i++) {
    weekDates.push(startOfWeekSub2.clone().add(i, 'days').format('YYYY-MM-DD'));
  }

  const startOfWeekSub1 = startOfWeekSub2.clone().startOf('isoWeek').add('week', 1);

  for (let i = 0; i < 7; i++) {
    weekDates.push(startOfWeekSub1.clone().add(i, 'days').format('YYYY-MM-DD'));
  }

  for (let i = 0; i < 7; i++) {
    weekDates.push(startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD'));
  }
  const startOfWeekAdd1 = startOfWeek.clone().startOf('isoWeek').add('week', 1);

  for (let i = 0; i < 7; i++) {
    weekDates.push(startOfWeekAdd1.clone().add(i, 'days').format('YYYY-MM-DD'));
  }

  const startOfWeekAdd2 = startOfWeekAdd1.clone().startOf('isoWeek').add('week', 1);

  for (let i = 0; i < 7; i++) {
    weekDates.push(startOfWeekAdd2.clone().add(i, 'days').format('YYYY-MM-DD'));
  }

  return weekDates;
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to remap getDay() result to make Monday = 0 and Sunday = 6
const remapDayToStartOnMonday = (day: number) => {
  return (day === 0) ? 6 : day - 1;
};

const constructDate = (year: number, month: number, day: number) => {
  return moment(`${year}-${month + 1}-${day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
};

export const getCalendarDates = (date: Date): CalendarDates => {
  const startOfMonth = moment(date).startOf("month");
  const endOfMonth = moment(startOfMonth).endOf('month');
  const totalDaysInThisMonth = startOfMonth.daysInMonth();

  const dates: CalendarDates = []

  const numberOfPreviousDaysRequired = Math.max(startOfMonth.isoWeekday() - 1, 0)

  const numberOfNextMonthDaysRequired = 7 - endOfMonth.isoWeekday()

  if (numberOfPreviousDaysRequired) {
    new Array(numberOfPreviousDaysRequired)
    .fill(0)
    .forEach((_, index, { length }) => {
      const date = moment(startOfMonth).subtract(length - index, "day");
      return dates.push({
        date: date.format("YYYY-MM-DD"),
        monthType: "previous",
        day: date.format('D'),
      });
    });
  }

  new Array(totalDaysInThisMonth).fill(0).forEach((_, index) => {
    const date = moment(startOfMonth).add(index, "day");
    dates.push({
      date: date.format("YYYY-MM-DD"),
      monthType: "current",
      day: date.format('D'),
    });
  });

  if (numberOfNextMonthDaysRequired) {
    new Array(numberOfNextMonthDaysRequired).fill(0).forEach((_, index) => {
      const date = moment(endOfMonth).add(index + 1, "day");
      return dates.push({
        date: date.format("YYYY-MM-DD"),
        monthType: "next",
        day: date.format('D'),
      });
    });
  }

  return dates;
};

export const getCalendarDatesForWeeks = (timestamp: Date): string[] => {
  const startOfCurrentWeek = moment(timestamp).startOf('week'); // Start of the current week
  const startOfRange = startOfCurrentWeek.clone().subtract(2, 'weeks'); // Start of 2 weeks before
  const endOfRange = startOfCurrentWeek.clone().add(2, 'weeks').endOf('week'); // End of 2 weeks after

  const dateArray = [];
  let currentDate = startOfRange.clone();

  while (currentDate.isBefore(endOfRange)) {
    dateArray.push(currentDate.format('YYYY-MM-DD'));
    currentDate.add(1, 'day');
  }

  return dateArray;
};
