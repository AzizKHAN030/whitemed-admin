import React from 'react';

import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';

import ClientSize from './components/client-size';
import { SizesColumn } from './components/columns';

const SizesPage = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const sizes = await prismadb.size.findMany({
    where: { storeId: storeId },
  });

  const formattedSizes: SizesColumn[] = sizes.map(size => ({
    ...size,
    createdAt: format(size.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientSize data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
