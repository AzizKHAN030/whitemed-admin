'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUp, ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type OrdersColumn = {
  id: number;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Order ID
          {column.getIsSorted() ? (
            <ArrowUp
              className={cn(
                'ml-2 h-4 w-4 transition-all',
                column.getIsSorted() === 'desc' && 'rotate-180'
              )}
            />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 transition-all" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: 'totalPrice',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total Price
          {column.getIsSorted() ? (
            <ArrowUp
              className={cn(
                'ml-2 h-4 w-4 transition-all',
                column.getIsSorted() === 'desc' && 'rotate-180'
              )}
            />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 transition-all" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: 'products',
    header: 'Products',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'isPaid',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Order payment status
          {column.getIsSorted() ? (
            <ArrowUp
              className={cn(
                'ml-2 h-4 w-4 transition-all',
                column.getIsSorted() === 'desc' && 'rotate-180'
              )}
            />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 transition-all" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          {column.getIsSorted() ? (
            <ArrowUp
              className={cn(
                'ml-2 h-4 w-4 transition-all',
                column.getIsSorted() === 'desc' && 'rotate-180'
              )}
            />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 transition-all" />
          )}
        </Button>
      );
    },
  },
];
