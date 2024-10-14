'use client';

import { format, isValid, parse } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/utils/cn';

interface Props<TFieldValue extends FieldValues> {
  field: ControllerRenderProps<TFieldValue>;
  isError?: boolean;
  placeHolder: string;
}

const FORMATE_DATE = 'dd/MM/yyyy';

export const DatePickerWithInput = <TFieldValue extends FieldValues>({
  field,
  isError,
  placeHolder,
}: Props<TFieldValue>) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [stringDate, setStringDate] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isDateDisabled = (date: Date) => {
    return date > new Date() || date < new Date('1900-01-01');
  };

  const handleOnSelect: SelectSingleEventHandler = (date) => {
    if (isDateDisabled(date as Date)) {
      setStringDate(''); // Clear if date is disabled
      field.onChange(undefined);
      return;
    }
    field.onChange(date);
    setIsPopoverOpen(false);
    setStringDate(format(date as Date, FORMATE_DATE));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStringDate(e.target.value); // Only update the state
  };

  const handleBlur = () => {
    if (!stringDate) {
      // Clear state and field if input is empty
      setStringDate('');
      field.onChange(undefined);
      return;
    }

    // Try to parse the date using multiple formats when input loses focus
    const parsedDate = parse(stringDate, FORMATE_DATE, new Date());
    const alternativeParsedDate = parse(stringDate, 'MMMM dd yyyy', new Date());

    // Validate and check if the parsed date is within the allowed range
    if (isValid(parsedDate) && !isDateDisabled(parsedDate)) {
      field.onChange(parsedDate);
      setStringDate(format(parsedDate, FORMATE_DATE));
    } else if (
      isValid(alternativeParsedDate) &&
      !isDateDisabled(alternativeParsedDate)
    ) {
      field.onChange(alternativeParsedDate);
      setStringDate(format(alternativeParsedDate, FORMATE_DATE));
    } else {
      // Clear state and field if input is invalid or outside the allowed date range
      setStringDate('');
      field.onChange(null);
    }
  };

  const handleClick = () => {
    setIsPopoverOpen(true);
  };

  // Update stringDate on edit mode
  useEffect(() => {
    if (field.value) {
      setStringDate(format(field.value, FORMATE_DATE));
    }
  }, [field.value]);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <div className="relative w-full">
            <Input
              type="text"
              value={stringDate}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onClick={handleClick}
              placeholder={placeHolder}
              className={cn(
                'w-full pl-3 text-left font-normal',
                isError && 'border border-red-500 hover:border-red-500'
              )}
              ref={inputRef}
            />
            <CalendarIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 opacity-50" />
          </div>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        onOpenAutoFocus={(e) => {
          e.preventDefault();

          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
        }}
      >
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={handleOnSelect}
          disabled={isDateDisabled}
          defaultMonth={field.value}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
