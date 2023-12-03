import React from 'react';

import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import { priceFormatter } from '@/lib/utils';

import ClientProduct from './components/client-product';
import { ProductsColumn } from './components/columns';

const ProductsPage = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const products = await prismadb.product.findMany({
    where: { storeId: storeId },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: ProductsColumn[] = products.map(product => ({
    ...product,
    color: product.color.value,
    size: product.size.value,
    category: product.category.name,
    sellPrice: priceFormatter.format(product.sellPrice.toNumber()),
    buyPrice: priceFormatter.format(product.buyPrice.toNumber()),
    createdAt: format(product.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientProduct data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
