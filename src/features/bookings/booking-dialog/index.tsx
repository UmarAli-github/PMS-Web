import dayjs from 'dayjs';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { UserSelection } from '../bookings.types';
import { BookingForm } from './booking-form';

interface BookingDialogProps {
  userSelection: UserSelection;
  handleOpenChange: (isOpen: boolean) => void;
}

export const BookingDialog = ({
  userSelection,
  handleOpenChange,
}: BookingDialogProps) => {
  const isOpen = React.useMemo(
    () => userSelection.bed !== null && userSelection.date !== null,
    [userSelection.bed, userSelection.date]
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
            {userSelection.bed?.name} on{' '}
            {dayjs(userSelection.date).format('DD/MM/YYYY')}
          </DialogDescription>
          <BookingForm
            closeDialog={closeDialog}
            userSelection={userSelection}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
