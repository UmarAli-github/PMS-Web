import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { toast } from 'sonner';

import { deleteBookingAction } from '@/actions/bookings';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteBookingModalProps {
  bookingId: number | null;
  setBookingId: Dispatch<SetStateAction<number | null>>;
}

export const DeleteBookingModal = ({
  bookingId,
  setBookingId,
}: DeleteBookingModalProps) => {
  const router = useRouter();
  const deleteBookingMutation = useMutation({
    mutationFn: deleteBookingAction,
  });

  const open = useMemo(() => bookingId !== null, [bookingId]);

  const onOpenChange = useCallback(
    (shouldOpen: boolean) => {
      if (!shouldOpen) {
        setBookingId(null);
      }
    },
    [setBookingId]
  );

  const handleDelete = useCallback(() => {
    if (bookingId) {
      deleteBookingMutation.mutate(bookingId, {
        onSuccess: () => {
          toast.success('Booking deleted successfully');
          router.refresh();
          setBookingId(null);
          deleteBookingMutation.reset();
        },
        onError: (error) => {
          toast.error(
            error.message ?? 'Failed to delete the booking. Please try again.'
          );
        },
      });
    }
  }, [deleteBookingMutation, bookingId, router, setBookingId]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            booking.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={
              deleteBookingMutation.isPaused || deleteBookingMutation.isSuccess
            }
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
