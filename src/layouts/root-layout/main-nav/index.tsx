'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ABSOLUTE_ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

const NAV_ITEMS = [
  {
    name: 'Overview',
    href: ABSOLUTE_ROUTES.ROOT,
  },
  {
    name: 'Bookings',
    href: ABSOLUTE_ROUTES.BOOKINGS,
  },
  {
    name: 'Rooms',
    href: ABSOLUTE_ROUTES.ROOMS,
  },
];

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {NAV_ITEMS.map((navItem) => (
        <Link
          key={navItem.href}
          href={navItem.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            {
              'text-muted-foreground': pathname !== navItem.href,
            }
          )}
        >
          {navItem.name}
        </Link>
      ))}
    </nav>
  );
};
