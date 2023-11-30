'use client';

import React from 'react';

import { Plus } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ClientBillboard = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage your billboards for your store"
        />
        <Button
          onClick={() => {
            router.push(`${pathname}/new`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default ClientBillboard;
