'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createRoomAction } from '@/actions/rooms';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { RoomFormSchema, roomFormSchema } from './add-room-modal-form.utils';

interface AddRoomModalFormProps {
  closeDialog: () => void;
}

export const AddRoomModalForm = ({ closeDialog }: AddRoomModalFormProps) => {
  const form = useForm<RoomFormSchema>({
    resolver: zodResolver(roomFormSchema),
  });

  const addRoomMutation = useMutation({
    mutationFn: createRoomAction,
  });

  const router = useRouter();

  const onSubmit = async (values: RoomFormSchema) =>
    addRoomMutation.mutate(values, {
      onSuccess: () => {
        toast.success('Room added successfully');
        router.refresh();
        closeDialog();
      },
      onError: (error) => {
        toast.error(
          error.message ?? 'Failed to submit the form. Please try again.'
        );
      },
    });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter room name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input
                  placeholder="Capacity of room"
                  type="number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="float-right"
          disabled={addRoomMutation.isPending || addRoomMutation.isSuccess}
        >
          Add
        </Button>
      </form>
    </Form>
  );
};
