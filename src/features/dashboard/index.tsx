import dayjs from 'dayjs';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/db';
import { sanitize } from '@/utils/sanitize';

import { BookingsDataTable } from './bookings-data-table';

export const Dashboard = async () => {
  const bookings = await prisma.booking.findMany().then(sanitize);
  const totalRevenue = await prisma.booking.aggregate({
    _sum: {
      price: true,
    },
  });

  const totalBookings = await prisma.booking.count();

  const totalRooms = await prisma.room.count();

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalRevenue._sum.price?.toString()}
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
            <div className="text-2xl font-bold">{totalBookings.toString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRooms.toString()}</div>
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
