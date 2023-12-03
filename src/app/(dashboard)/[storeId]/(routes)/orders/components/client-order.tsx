'use client';

import React from 'react';

import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';

import { OrdersColumn, columns } from './columns';
import { DataTable } from './data-table';

interface ClientOrderProps {
  data: OrdersColumn[];
}

const ClientOrder: React.FC<ClientOrderProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage your orders for your store"
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} filterColumn="label" />
    </>
  );
};

export default ClientOrder;
