'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createBookingAction } from '@/actions/bookings';
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
import { BOOKING_STATUS } from '@/constants/bookings';

import { UserSelection } from '../../bookings.types';
import { BookingFormSchema, bookingFormSchema } from './booking-form.utils';

interface BookingFormProps {
  userSelection: UserSelection;
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
      bed: userSelection.bed ?? {
        id: 0,
        name: '',
      },
      from: userSelection.date ?? new Date(),
    },
    mode: 'onChange',
  });
  const addBookingMutation = useMutation({
    mutationFn: createBookingAction,
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

  const onSubmit = (values: BookingFormSchema) => {
    addBookingMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="bed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room-Bed</FormLabel>
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
                  fromDate={dayjs(form.getValues('from')).toDate()}
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

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select booking status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(
                      Object.keys(
                        BOOKING_STATUS
                      ) as (keyof typeof BOOKING_STATUS)[]
                    ).map((key) => {
                      const { color: backgroundColor, label } = BOOKING_STATUS[
                        key
                      ] ?? {
                        color: 'gray',
                        label: 'Unknown',
                      };

                      return (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <div
                              className="size-2 shrink-0 grow-0 rounded-full"
                              style={{
                                backgroundColor,
                              }}
                            />
                            <div>{label}</div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payment.cash"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment (Cash)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Amount paid via cash"
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
            name="payment.card"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment (Card)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Amount paid via card"
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
            name="payment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Payment</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Amount paid via cash"
                    type="number"
                    disabled
                    value={
                      (Number(field.value.card) || 0) +
                      (Number(field.value.cash) || 0)
                    }
                  />
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
