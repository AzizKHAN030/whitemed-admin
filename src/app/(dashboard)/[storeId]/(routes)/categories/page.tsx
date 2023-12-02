import React from 'react';

import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';

import ClientCategory from './components/client-category';
import { CategoryColumn } from './components/columns';

const CategoriesPage = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const categories = await prismadb.category.findMany({
    where: { storeId: storeId },
    include: { billboard: true },
    orderBy: { createdAt: 'desc' },
  });

  const formattedCategories: CategoryColumn[] = categories.map(category => ({
    ...category,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientCategory data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
