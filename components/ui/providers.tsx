'use client';

import { TooltipProvider } from '@/components/ui/tooltip';

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
