'use client';

import React from 'react';

import { Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import ApiList from '@/components/api-list';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { ProductsColumn, columns } from './columns';
import { DataTable } from './data-table';

interface ClientProductProps {
  data: ProductsColumn[];
}

const ClientProduct: React.FC<ClientProductProps> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage your products for your store"
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
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ClientProduct;
