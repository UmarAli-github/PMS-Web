'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Room } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FieldErrors } from 'react-hook-form';

import { createBookingActionUpdated } from '@/actions/bookings';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { DatePickerWithInput } from '@/components/ui/date-picker-with-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { BookingFormSchema, bookingFormSchema } from './booking-form.utils';
import { Value } from '@radix-ui/react-select';
import { useState } from 'react';

interface BookingFormProps {
  userSelection: {
    room: Room;
    date: Date;
  };
  closeDialog: () => void;
}
export const BookingForm = ({
  userSelection,
  closeDialog,
}: BookingFormProps) => {
  const router = useRouter();
  const form = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      room: userSelection.room,
      from: userSelection.date,
    },
  });
  const addBookingMutation = useMutation({
    mutationFn: createBookingActionUpdated,
    onSuccess: () => {
      router.refresh();
      toast.success('Booking created successfully');
      closeDialog();
    },
    onError: (error) => {
      toast.error(
        error.message ?? 'Failed to create the booking. Please try again.'
      );
    },
  });

  const [people, setPeople] = useState(1);

  const onSubmit = (values: BookingFormSchema) => {
    // Add 'people' to the 'values' object
    const payload = { ...values, people };

    // Now pass a single object to the mutation function
    addBookingMutation.mutate(payload);
  };

  const onError = (errors: FieldErrors<BookingFormSchema>) => {
    console.log('Validation errors:', errors);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeople(Number(event.target.value));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-8"
      >
        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Room</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Room name"
                    disabled
                    value={field.value.name}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From</FormLabel>
                <DatePicker
                  date={field.value}
                  setDate={field.onChange}
                  disabled
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To</FormLabel>
                <DatePicker
                  date={field.value}
                  setDate={field.onChange}
                  fromDate={dayjs(form.getValues('from'))
                    .add(1, 'day')
                    .toDate()}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DOB</FormLabel>

                <DatePickerWithInput field={field} placeHolder="Select DOB" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="neither">Neither</SelectItem>
                    <SelectItem value="prefer_not_to_say">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="room.capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity ({people})</FormLabel>
                <FormControl>
                  <Input
                    type="range"
                    value={people}
                    onChange={onChangeHandler}
                    min={1}
                    max={userSelection.room.capacity}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (Currency)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Invoice amount for booking"
                    type="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payment.total"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice (Total)</FormLabel>
                <FormControl>
                  <Input placeholder="Invoice Total" type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payment.card"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice (Card)</FormLabel>
                <FormControl>
                  <Input placeholder="Invoice Card" type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payment.cash"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice (Cash)</FormLabel>
                <FormControl>
                  <Input placeholder="Invoice Cash" type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Type of verification ID" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cnic">CNIC</SelectItem>
                    <SelectItem value="driver_license">
                      Driver License
                    </SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID#</FormLabel>
                <FormControl>
                  <Input placeholder="Identification Number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="float-right">
          Submit
        </Button>
      </form>
    </Form>
  );
};
