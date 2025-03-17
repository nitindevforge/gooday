import moment, { Moment } from "moment";

export const getFormattedDate = (format: string, date: string | Date = "") => {
  const today = date ? moment(date) : moment();
  return today?.format(format);
};

export const convertTo24HourFormat = (timeString: string) => {
  const [time, modifier] = timeString.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") hours = "00";
  if (modifier === "PM") hours = parseInt(hours, 10) + 12;
  return { hours, minutes };
};

export const getMaxDate = (time: string) => {
  if (time) {
    const { hours, minutes } = convertTo24HourFormat(time);
    const validDate = new Date();
    validDate.setHours(Number(hours), Number(minutes));
    return validDate;
  }
  return undefined;
};

export const checkMonth = (date: string) => {
  const selectedMonth = new Date(date!)?.getMonth();
  const currentMonth = new Date()?.getMonth();
  const selectedYear = new Date(date!)?.getFullYear();
  const currentYear = new Date()?.getFullYear();
  return selectedMonth === currentMonth && selectedYear === currentYear;
};

export const capitalizedResult = (result: string) => {
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const getDatesBefore = (date?: Moment) => {
  const targetDate = date ? moment(date) : moment();
  const startOfMonth = targetDate.clone().startOf("month");
  const dates: Date[] = [];

  while (startOfMonth.isBefore(targetDate, "day")) {
    dates.push(new Date(startOfMonth.clone().format("YYYY-MM-DD")));
    startOfMonth.add(1, "day");
  }
  return dates || [];
};
