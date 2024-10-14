import { Room } from '@prisma/client';
import dayjs from 'dayjs';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { BookingForm } from './booking-form';

interface BookingDialogProps {
  userSelection: {
    room: Room | null;
    date: Date | null;
  };
  handleOpenChange: (isOpen: boolean) => void;
}

export const BookingDialog = ({
  userSelection,
  handleOpenChange,
}: BookingDialogProps) => {
  const isOpen = React.useMemo(
    () => userSelection.room !== null && userSelection.date !== null,
    [userSelection.room, userSelection.date]
  );

  const closeDialog = React.useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[min(90vw,800px)]">
        <DialogHeader>
          <DialogTitle>Enter the booking details</DialogTitle>
          <DialogDescription>
            {userSelection.room?.name} on{' '}
            {dayjs(userSelection.date).format('DD/MM/YYYY')}
          </DialogDescription>
          <BookingForm
            closeDialog={closeDialog}
            userSelection={{
              room: userSelection.room ?? {
                id: 0,
                name: '',
                capacity: 0,
              },
              date: userSelection.date ?? new Date(),
            }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
