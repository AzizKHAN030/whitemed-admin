'use client';

import React from 'react';

import { Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import ApiList from '@/components/api-list';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { BillboardsColumn, columns } from './columns';
import { DataTable } from './data-table';

interface ClientBillboardProps {
  data: BillboardsColumn[];
}

const ClientBillboard: React.FC<ClientBillboardProps> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
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
      <DataTable columns={columns} data={data} filterColumn="label" />
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

export default ClientBillboard;
