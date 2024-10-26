'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BOOKING_STATUS } from '@/constants/bookings';
import { GetAllBedsResponse } from '@/services/beds';
import { GetAllBookingsResponse } from '@/services/bookings';
import { cn } from '@/utils/cn';

import { BookingDialog } from './booking-dialog';
import { UserSelection } from './bookings.types';
import { calenderStartRangeInitial } from './bookings.utils';

interface BookingsProps {
  beds: GetAllBedsResponse;
  bookings: GetAllBookingsResponse;
}

const FORMAT_DATE = 'YYYY-MM-DD';

export const Bookings = ({ beds, bookings }: BookingsProps) => {
  // react states
  const [calenderStartRange, setCalenderStartRange] = React.useState<Date>(
    calenderStartRangeInitial
  );
  const bookingMap = useMemo(() => {
    const map = new Map<string, GetAllBookingsResponse[number]>();
    bookings.forEach((booking) => {
      const key = `${dayjs(booking.from).format(FORMAT_DATE)}-${booking.bedId}`;
      map.set(key, booking);
      // also add the next days till booking.to
      const to = dayjs(booking.to);
      let current = dayjs(booking.from).add(1, 'day');
      while (current.isBefore(to, 'day')) {
        map.set(`${current.format(FORMAT_DATE)}-${booking.bedId}`, booking);
        current = current.add(1, 'day');
      }
    });
    return map;
  }, [bookings]);
  const [userSelection, setUserSelection] = React.useState<UserSelection>({
    bed: null,
    date: null,
  });
  // derived states
  const rows = beds;
  const columns = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) =>
        dayjs(calenderStartRange).add(i, 'day').toDate()
      ),
    [calenderStartRange]
  );

  //   handlers
  const handleNext = React.useCallback(() => {
    setCalenderStartRange((prev) => dayjs(prev).add(30, 'day').toDate());
  }, []);

  const handlePrevious = React.useCallback(() => {
    setCalenderStartRange((prev) => dayjs(prev).subtract(30, 'day').toDate());
  }, []);

  const handleOpenChange = React.useCallback((shouldOpen: boolean) => {
    if (!shouldOpen)
      setUserSelection({
        bed: null,
        date: null,
      });
  }, []);

  const handleSelectDate = React.useCallback(
    (date: Date, bed: GetAllBedsResponse[number]) => {
      setUserSelection({
        bed,
        date,
      });
    },
    []
  );

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Button onClick={handlePrevious}>
          <ArrowLeftIcon className="mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext}>
          Next
          <ArrowRightIcon className="ml-2" />
        </Button>
      </div>
      <Table>
        <TableCaption>Click on a slot to book it</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Room-Bed</TableHead>
            {columns.map((date) => (
              <TableHead
                key={dayjs(date).format('DD/MM/YYYY')}
                //   if its todays date then add a class to highlight it
                className={cn({
                  'font-semibold text-primary': dayjs(date).isSame(
                    dayjs(),
                    'day'
                  ),
                })}
              >
                <div>{dayjs(date).format('DD')}</div>
                <div>{dayjs(date).format('MMM')}</div>
                <div>{dayjs(date).format('ddd')}</div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows?.map((bed) => (
            <TableRow key={bed.id}>
              <TableCell className="whitespace-nowrap">{bed.name}</TableCell>
              {columns.map((date) => {
                const currentBooking = bookingMap.get(
                  `${dayjs(date).format(FORMAT_DATE)}-${bed.id}`
                );
                const doesBookingExist = currentBooking !== undefined;
                const backgroundColor = doesBookingExist
                  ? BOOKING_STATUS[currentBooking.status].color
                  : undefined;

                const buttonComp = (
                  <Button
                    className="size-full rounded-none opacity-80"
                    style={{
                      backgroundColor,
                    }}
                    variant="ghost"
                    disabled={dayjs(date).isBefore(dayjs(), 'day')}
                    onClick={() => {
                      if (doesBookingExist) return;
                      handleSelectDate(date, bed);
                    }}
                  >
                    <span className="sr-only">
                      Book {bed.name} on {dayjs(date).format('DD/MM/YYYY')}
                    </span>
                    -
                  </Button>
                );

                // No need to show tooltip if the date is in the past or if there is a booking and the date is not the same as the start date of the booking
                if (
                  dayjs(date).isBefore(dayjs(), 'day') ||
                  (doesBookingExist &&
                    !dayjs(currentBooking?.from).isSame(date, 'day'))
                ) {
                  return (
                    <TableCell
                      className="p-0"
                      key={dayjs(date).format('DD/MM/YYYY')}
                    >
                      {buttonComp}
                    </TableCell>
                  );
                }

                return (
                  <TableCell
                    className="p-0"
                    key={dayjs(date).format('DD/MM/YYYY')}
                  >
                    <Tooltip
                      open={
                        doesBookingExist
                          ? dayjs(currentBooking.from).isSame(date, 'day')
                          : undefined
                      }
                    >
                      <TooltipTrigger asChild>{buttonComp}</TooltipTrigger>
                      <TooltipContent
                        sideOffset={doesBookingExist ? -28 : 0}
                        align={doesBookingExist ? 'start' : undefined}
                        alignOffset={doesBookingExist ? 2 : undefined}
                        className={cn({
                          'rounded-sm px-1.5 py-0.5': doesBookingExist,
                        })}
                      >
                        {doesBookingExist ? (
                          <div className="max-w-16 overflow-ellipsis whitespace-nowrap">
                            {currentBooking.name}
                          </div>
                        ) : (
                          <div>Available to book</div>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BookingDialog
        userSelection={userSelection}
        handleOpenChange={handleOpenChange}
      />
    </div>
  );
};
