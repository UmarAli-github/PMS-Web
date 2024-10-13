import { Branding } from '@/layouts/root-layout/branding';
import { MainNav } from '@/layouts/root-layout/main-nav';
import { RootLayoutProviders } from '@/layouts/root-layout/providers';
import { PropsWithChildren } from '@/types/common';

import { ModeToggle } from '../../components/mode-toggle';

interface RootLayoutProps extends PropsWithChildren {}

export const RootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="antialiased">
        <RootLayoutProviders>
          <div className="flex flex-col">
            <div className="fixed top-0 z-10 w-full border-b bg-background">
              <div className="flex h-16 items-center px-4">
                <Branding />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                  <ModeToggle />
                </div>
              </div>
            </div>
            <div className="mt-16">{children}</div>
          </div>
        </RootLayoutProviders>
      </body>
    </html>
  );
};
