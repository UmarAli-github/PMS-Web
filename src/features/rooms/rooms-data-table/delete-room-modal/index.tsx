import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { toast } from 'sonner';

import { deleteRoomAction } from '@/actions/rooms';
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

interface DeleteRoomModalProps {
  roomId: number | null;
  setRoomId: Dispatch<SetStateAction<number | null>>;
}

export const DeleteRoomModal = ({
  roomId,
  setRoomId,
}: DeleteRoomModalProps) => {
  const router = useRouter();
  const deleteRoomMutation = useMutation({
    mutationFn: deleteRoomAction,
  });

  const open = useMemo(() => roomId !== null, [roomId]);

  const onOpenChange = useCallback(
    (shouldOpen: boolean) => {
      if (!shouldOpen) {
        setRoomId(null);
      }
    },
    [setRoomId]
  );

  const handleDelete = useCallback(() => {
    if (roomId) {
      deleteRoomMutation.mutate(roomId, {
        onSuccess: () => {
          toast.success('Room deleted successfully');
          router.refresh();
          setRoomId(null);
          deleteRoomMutation.reset();
        },
        onError: (error) => {
          toast.error(
            error.message ?? 'Failed to delete the room. Please try again.'
          );
        },
      });
    }
  }, [deleteRoomMutation, roomId, router, setRoomId]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the room.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={
              deleteRoomMutation.isPaused || deleteRoomMutation.isSuccess
            }
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
