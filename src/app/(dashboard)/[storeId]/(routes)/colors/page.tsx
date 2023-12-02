import React from 'react';

import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';

import ClientColor from './components/client-color';
import { ColorsColumn } from './components/columns';

const ColorsPage = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const colors = await prismadb.color.findMany({
    where: { storeId: storeId },
  });

  const formattedColors: ColorsColumn[] = colors.map(color => ({
    ...color,
    createdAt: format(color.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientColor data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
