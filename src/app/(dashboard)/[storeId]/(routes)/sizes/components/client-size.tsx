'use client';

import React from 'react';

import { Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import ApiList from '@/components/api-list';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { SizesColumn, columns } from './columns';
import { DataTable } from './data-table';

interface ClientSizeProps {
  data: SizesColumn[];
}

const ClientSize: React.FC<ClientSizeProps> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage your sizes for your products"
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
      <DataTable columns={columns} data={data} filterColumn="name" />
      <Heading title="API" description="API calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default ClientSize;
