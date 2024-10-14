'use client';

import { Booking, Room } from '@prisma/client';
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
import { cn } from '@/utils/cn';

import { BookingDialog } from './booking-dialog';
import { calenderStartRangeInitial } from './bookings.utils';

interface BookingsProps {
  rooms: Room[];
  bookings: Booking[];
}

const FORMAT_DATE = 'YYYY-MM-DD';

export const Bookings = ({ rooms, bookings }: BookingsProps) => {
  // react states
  const [calenderStartRange, setCalenderStartRange] = React.useState<Date>(
    calenderStartRangeInitial
  );
  const bookingMap = useMemo(() => {
    const map = new Map<string, Booking>();
    bookings.forEach((booking) => {
      const key = `${dayjs(booking.from).format(FORMAT_DATE)}-${booking.roomId}`;
      map.set(key, booking);
      // also add the next days till booking.to
      const to = dayjs(booking.to);
      let current = dayjs(booking.from).add(1, 'day');
      while (current.isBefore(to, 'day')) {
        map.set(`${current.format(FORMAT_DATE)}-${booking.roomId}`, booking);
        current = current.add(1, 'day');
      }
    });
    return map;
  }, [bookings]);
  const [userSelection, setUserSelection] = React.useState<{
    room: Room | null;
    date: Date | null;
  }>({
    room: null,
    date: null,
  });
  // derived states
  const rows = rooms;
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
        room: null,
        date: null,
      });
  }, []);

  const handleSelectDate = React.useCallback((date: Date, room: Room) => {
    setUserSelection({
      room,
      date,
    });
  }, []);

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
            <TableHead className="w-[100px]">Rooms</TableHead>
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
          {rows?.map((room) => (
            <TableRow key={room.id}>
              <TableCell className="whitespace-nowrap">{room.name}</TableCell>
              {columns.map((date) => {
                const currentBooking = bookingMap.get(
                  `${dayjs(date).format(FORMAT_DATE)}-${room.id}`
                );
                return (
                  <TableCell
                    className="p-0"
                    key={dayjs(date).format('DD/MM/YYYY')}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className={cn('size-full rounded-none', {
                            'bg-destructive hover:bg-destructive':
                              currentBooking,
                          })}
                          variant="ghost"
                          disabled={dayjs(date).isBefore(dayjs(), 'day')}
                          onClick={() => handleSelectDate(date, room)}
                        >
                          <span className="sr-only">
                            Book {room.name} on {dayjs(date).format('DD/MM')}
                          </span>
                          -
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {currentBooking ? (
                          <div>
                            <div>{currentBooking?.name} booked this room</div>
                            <div>
                              from{' '}
                              {dayjs(currentBooking.from).format(
                                'MMM DD, YYYY'
                              )}{' '}
                              to{' '}
                              {dayjs(currentBooking.to).format('MMM DD, YYYY')}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div>Available to book</div>
                          </div>
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
