import { PlusIcon } from '@radix-ui/react-icons';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDialog } from '@/hooks/use-dialog';

import { AddRoomModalForm } from './add-room-modal-form';

export const AddRoomModal = () => {
  const { isOpen, setIsOpen, close } = useDialog();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} aria-label="Add Room">
      <DialogTrigger asChild>
        <Button variant="default">
          Add Room <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Room</DialogTitle>
          <DialogDescription>Enter the details of the room</DialogDescription>
          <AddRoomModalForm closeDialog={close} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
