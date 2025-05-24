import './globals.css';

import { Home, Scale, Settings, Footprints, Users2, BadgeInfo } from 'lucide-react';
import { NavItem } from '@/components/ui/nav-item';
import Providers from '@/components/ui/providers';
import Image from 'next/image';

export const metadata = {
  title: '1001 bornes',
  description:
    "Site de l'association 1001 bornes."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <Providers>
          <main className="flex min-h-screen w-full flex-col bg-muted/40">
            <DesktopNav />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <div className="text-4xl font-semibold leading-none tracking-tight text-center">
                  Mille et une bornes
                </div>
                {/* <MobileNav /> */}
                {/* <User /> */}
              </header>
              <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
                {children}
              </main>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem href="/" label="1001 bornes">
          <Image src="/logo-1001.png" width="63" height="92" alt="Logo 1001 bornes"/>
        </NavItem>
        <NavItem href="/" label="Accueil">
          <Home className="h-5 w-5" />
        </NavItem>
        <NavItem href="/randonnees" label="Randonnées">
          <Footprints className="h-5 w-5" />
        </NavItem>
        <NavItem href="/randonneurs?type=animateurs" label="Animateurs">
          <Users2 className="h-5 w-5" />
        </NavItem>
        <NavItem href="/qui-sommes-nous" label="Qui sommes nous ?">
          <BadgeInfo className="h-5 w-5" />
        </NavItem>
        
        <NavItem href="/mentions-legales" label="Mentions légales">
          <Scale className="h-5 w-5" />
        </NavItem>

      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem href="#" label="Settings">
          <Settings className="h-5 w-5" />
        </NavItem>
      </nav>
    </aside>
  );
}

// function MobileNav() {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button size="icon" variant="outline" className="sm:hidden">
//           <PanelLeft className="h-5 w-5" />
//           <span className="sr-only">Toggle Menu</span>
//         </Button>
//       </SheetTrigger>
//       <SheetContent side="left" className="sm:max-w-xs">
//         <nav className="grid gap-6 text-lg font-medium">
//           <Link
//             href="#"
//             className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
//           >
//             <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
//             <span className="sr-only">Vercel</span>
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//           >
//             <Home className="h-5 w-5" />
//             Dashboard
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//           >
//             <ShoppingCart className="h-5 w-5" />
//             Orders
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-4 px-2.5 text-foreground"
//           >
//             <Package className="h-5 w-5" />
//             Products
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//           >
//             <Users2 className="h-5 w-5" />
//             Customers
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//           >
//             <LineChart className="h-5 w-5" />
//             Settings
//           </Link>
//         </nav>
//       </SheetContent>
//     </Sheet>
//   );
// }

