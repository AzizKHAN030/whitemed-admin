import React from 'react';

import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';

import ClientBillboard from './components/client-billboard';
import { BillboardsColumn } from './components/columns';

const BillboardsPage = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: storeId },
  });

  const formattedBillboards: BillboardsColumn[] = billboards.map(billboard => ({
    ...billboard,
    createdAt: format(billboard.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientBillboard data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
