'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { Color } from '@prisma/client';
import { PopoverContent } from '@radix-ui/react-popover';
import Colorful from '@uiw/react-color-colorful';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { z } from 'zod';

import Heading from '@/components/heading';
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
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface ColorFormProps {
  initialData: Color | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .min(4)
    .regex(/^#([0-9a-f]{3}){1,2}$/i, { message: 'Invalid hex color' }),
});

type ColorFormValues = z.infer<typeof formSchema>;

const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hex, setHex] = useState(initialData?.value || '#fff');

  const router = useRouter();
  const params = useParams();

  const title = initialData ? 'Edit Color' : 'New Color';
  const description = initialData ? 'Edit your color' : 'Create a new color';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: '', value: '' },
  });

  const onSubmit = async (values: ColorFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        const request = axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          values
        );

        await toast.promise(request, {
          loading: 'Saving changes...',
          success: 'Changes saved!',
          error: 'Error saving changes',
        });
      } else {
        const request = axios.post(`/api/${params.storeId}/colors`, values);

        await toast.promise(request, {
          loading: 'Creating...',
          success: 'Color created!',
          error: 'Error creating a color',
        });
      }

      router.push(`/${params.storeId}/colors`);
      router.refresh();
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
        `/api/${params.storeId}/colors/${params.colorId}`
      );

      await toast.promise(request, {
        loading: 'Deleting color...',
        success: 'Color deleted!',
        error: 'Error deleting color',
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
            color="sm"
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Color Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-2">
                      <Input
                        disabled={loading}
                        placeholder="Color Value"
                        {...field}
                        onChange={e => {
                          setHex(e.target.value);
                          field.onChange(e.target.value);
                        }}
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <div
                            style={{ backgroundColor: field.value }}
                            className="h-8 w-8 rounded-full flex-shrink-0 border cursor-pointer hover:backdrop-contrast-50 transition-all"
                          />
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          className="ml-[40px] translate-y-[-50%]"
                        >
                          <Colorful
                            color={hex}
                            onChange={color => {
                              setHex(color.hex);
                              field.onChange(color.hex);
                            }}
                            disableAlpha={true}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
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

export default ColorForm;
