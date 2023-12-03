'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUp, ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import CellAction from './cell-action';

export type ProductsColumn = {
  id: string;
  name: string;
  sellPrice: string;
  buyPrice: string;
  isArchived: boolean;
  isFeatured: boolean;
  color: string;
  size: string;
  category: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
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
    accessorKey: 'sellPrice',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Selling Price
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
    accessorKey: 'buyPrice',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Buying Price
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
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          {row.original.color}
          <div
            className="w-6 h-6 rounded-full border"
            style={{ backgroundColor: row.original.color }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'isArchived',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Archived
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
    accessorKey: 'isFeatured',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Featured
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
  {
    id: 'actions',
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
