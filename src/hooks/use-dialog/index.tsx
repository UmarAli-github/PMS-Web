import React, { useCallback, useMemo } from 'react';

export const useDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return useMemo(
    () => ({
      isOpen,
      open,
      close,
      setIsOpen,
      toggle,
    }),
    [close, isOpen, open, toggle]
  );
};
