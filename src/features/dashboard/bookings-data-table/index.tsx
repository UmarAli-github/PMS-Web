/* eslint-disable react/no-unstable-nested-components */

'use client';

import { Booking } from '@prisma/client';
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import Link from 'next/link';
import * as React from 'react';

import { DataTablePagination } from '@/components/data-table-pagination';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ABSOLUTE_ROUTES } from '@/constants/routes';

import { DeleteBookingModal } from './delete-booking-modal';

interface BookingsDataTableProps {
  bookings: Booking[];
}

export const BookingsDataTable = ({ bookings }: BookingsDataTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [bookingId, setBookingId] = React.useState<number | null>(null);

  const handleDelete = (bookingIdArg: number) => {
    setBookingId(bookingIdArg);
  };

  const columns: ColumnDef<Booking>[] = React.useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <div>{row.getValue('id')}</div>,
      },
      {
        accessorKey: 'roomId',
        header: 'Room ID',
        cell: ({ row }) => <div>{row.getValue('roomId')}</div>,
      },
      {
        accessorKey: 'name',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Booking Name
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => <div className="px-4">{row.getValue('name')}</div>,
      },
      {
        accessorKey: 'from',
        header: 'From',
        cell: ({ row }) => (
          <div>{dayjs(row.getValue('from')).format('DD/MM/YYYY')}</div>
        ),
      },
      {
        accessorKey: 'to',
        header: 'To',
        cell: ({ row }) => (
          <div>{dayjs(row.getValue('to')).format('DD/MM/YYYY')}</div>
        ),
      },
      {
        accessorKey: 'dob',
        header: 'DOB',
        cell: ({ row }) => (
          <div>{dayjs(row.getValue('dob')).format('DD/MM/YYYY')}</div>
        ),
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        cell: ({ row }) => <div>{row.getValue('gender')}</div>,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => <div>{row.getValue('price')}</div>,
      },
      {
        accessorKey: 'payment.total', // Adjust this to match your data structure
        header: 'Total',
        cell: ({ row }) => <div>{row.original.payment?.total || 'N/A'}</div>,
      },
      {
        accessorKey: 'payment.card', // Adjust this to match your data structure
        header: 'By Card',
        cell: ({ row }) => <div>{row.original.payment?.card || 'N/A'}</div>,
      },
      {
        accessorKey: 'payment.cash', // Adjust this to match your data structure
        header: 'By Cash',
        cell: ({ row }) => <div>{row.original.payment?.cash || 'N/A'}</div>,
      },
      {
        accessorKey: 'idType',
        header: 'ID Type',
        cell: ({ row }) => <div>{row.getValue('idType')}</div>,
      },
      {
        accessorKey: 'idNo',
        header: 'ID No',
        cell: ({ row }) => <div>{row.getValue('idNo')}</div>,
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const booking = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="float-right">
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(`${booking.id}`)}
                >
                  Copy Booking ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => handleDelete(booking.id)}
                >
                  Delete booking
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: bookings,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild>
            <Link href={ABSOLUTE_ROUTES.BOOKINGS}>Book a room</Link>
          </Button>
          <DeleteBookingModal
            bookingId={bookingId}
            setBookingId={setBookingId}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};
