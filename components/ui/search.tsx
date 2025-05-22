'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/icons';
import { Search } from 'lucide-react';

export function SearchInput({searchTerm}: Readonly<{searchTerm: string}>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function searchAction(formData: FormData) {
    let value = formData.get('q') as string;
    let params = new URLSearchParams({ q: value });
    startTransition(() => {
      const urlIncludingSearch= window.location.href.split('?')[0]+`?${params.toString()}`
      router.replace(urlIncludingSearch);
    });
  }

  let previousSearchTerm = searchTerm ?? '';
  return (
    <form action={searchAction} className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder="Search..."
        defaultValue={previousSearchTerm}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
      {isPending && <Spinner />}
    </form>
  );
}
