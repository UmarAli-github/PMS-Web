import dayjs from 'dayjs';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/db';
import { getAllBookings } from '@/services/bookings';

import { BookingsDataTable } from './bookings-data-table';

export const Dashboard = async () => {
  const bookings = await getAllBookings();
  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      card: true,
      cash: true,
    },
  });

  const totalBookings = await prisma.booking.count();

  const totalRooms = await prisma.room.count();

  const totalBeds = await prisma.bed.count();

  const todaysActiveBooking = await prisma.booking.findMany({
    where: {
      AND: [
        {
          from: {
            lte: dayjs().endOf('day').toDate(),
          },
        },
        {
          to: {
            gte: dayjs().startOf('day').toDate(),
          },
        },
      ],
    },
  });

  return (
    <div defaultValue="booking" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(totalRevenue._sum?.card ?? 0) +
                Number(totalRevenue._sum?.cash ?? 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`${totalBookings}`}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`${totalRooms}`}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Beds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`${totalBeds}`}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Todays Active Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todaysActiveBooking.length}
            </div>
          </CardContent>
        </Card>
      </div>
      <BookingsDataTable bookings={bookings} />
    </div>
  );
};
