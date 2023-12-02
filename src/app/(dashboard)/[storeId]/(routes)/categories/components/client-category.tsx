'use client';

import React from 'react';

import { Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import ApiList from '@/components/api-list';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { CategoryColumn, columns } from './columns';
import { DataTable } from './data-table';

interface ClientCategoryProps {
  data: CategoryColumn[];
}

const ClientCategory: React.FC<ClientCategoryProps> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage your categories for your store"
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
      <Heading title="API" description="API calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};

export default ClientCategory;
