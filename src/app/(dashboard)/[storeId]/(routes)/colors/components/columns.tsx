'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUp, ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import CellAction from './cell-action';

export type ColorsColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorsColumn>[] = [
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
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          {row.original.value}
          <div
            className="w-6 h-6 rounded-full border"
            style={{ backgroundColor: row.original.value }}
          />
        </div>
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
