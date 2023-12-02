'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

import axios from 'axios';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import AlertModal from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CategoryColumn } from './columns';

interface CellActionProps {
  data: CategoryColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    router.push(`${pathname}/${data.id}`);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(data.id);
    toast.success('Category ID is copied to clipboard');
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      const request = axios.delete(
        `/api/${params.storeId}/categories/${data.id}`
      );

      await toast.promise(request, {
        loading: 'Deleting category...',
        success: 'Category deleted',
        error: 'Failed to delete category',
      });

      router.refresh();
    } catch (error) {
      console.log('>>>', error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleEditClick}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyClick}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onDelete}
      />
    </>
  );
};

export default CellAction;
