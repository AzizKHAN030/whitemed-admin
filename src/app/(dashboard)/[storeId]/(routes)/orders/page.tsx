import React from 'react';

import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import { priceFormatter } from '@/lib/utils';

import ClientOrder from './components/client-order';
import { OrdersColumn } from './components/columns';

const OrdersPage = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const orders = await prismadb.order.findMany({
    where: { storeId: storeId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrders: OrdersColumn[] = orders.map(order => ({
    ...order,
    products: order.orderItems
      .map(orderItem => orderItem.product.name)
      .join(', '),
    totalPrice: priceFormatter.format(
      order.orderItems.reduce(
        (total, item) => total + Number(item.product.sellPrice),
        0
      )
    ),
    createdAt: format(order.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientOrder data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
