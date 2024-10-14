import dayjs from 'dayjs';

export const calenderStartRangeInitial = () => {
  // if todays date is before 14 then set the start date to last month 14th else set it to current month 14th
  const today = dayjs();
  const startOfCurrentMonth = today.startOf('month');
  const startOfLastMonth = today.subtract(1, 'month').startOf('month');
  const startOfCurrentMonth14 = startOfCurrentMonth.set('date', 14);
  const startOfLastMonth14 = startOfLastMonth.set('date', 14);

  return today.date() < 14
    ? startOfLastMonth14.toDate()
    : startOfCurrentMonth14.toDate();
};
