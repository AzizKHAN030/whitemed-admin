'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { z } from 'zod';

import ApiAlert from '@/components/api-alert';
import Heading from '@/components/heading';
import ImageUpload from '@/components/image-upload';
import AlertModal from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import useOrigin from '@/hooks/use-origin';

interface BillboardFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const origin = useOrigin();
  const params = useParams();

  const title = initialData ? 'Edit Billboard' : 'New Billboard';
  const description = initialData
    ? 'Edit your billboard'
    : 'Create a new billboard';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { label: '', imageUrl: '' },
  });

  const onSubmit = async (values: BillboardFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        const request = axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          values
        );

        await toast.promise(request, {
          loading: 'Saving changes...',
          success: 'Changes saved!',
          error: 'Error saving changes',
        });

        router.refresh();
      } else {
        const request = axios.post(`/api/${params.storeId}/billboards`, values);

        const {
          data: { id },
        } = await toast.promise(request, {
          loading: 'Creating...',
          success: 'Billboard created!',
          error: 'Error creating a billboard',
        });

        router.push(`/${params.storeId}/billboards/${id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      const request = axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );

      await toast.promise(request, {
        loading: 'Deleting billboard...',
        success: 'Billboard deleted!',
        error: 'Error deleting billboard',
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={url => {
                      field.onChange(url);
                    }}
                    onRemove={() => {
                      field.onChange('');
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard Label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${initialData?.id}`}
      />
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

export default BillboardForm;
