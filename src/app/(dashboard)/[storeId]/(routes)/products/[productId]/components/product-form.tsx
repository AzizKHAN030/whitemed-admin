'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Color, Image, Size } from '@prisma/client';
import { Product } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { z } from 'zod';

import Heading from '@/components/heading';
import ImageUpload from '@/components/image-upload';
import AlertModal from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface ProductFormProps {
  initialData: (Product & { images: Image[] }) | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string().min(1) }).array(),
  sellPrice: z.coerce.number().min(1),
  buyPrice: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const title = initialData ? initialData.name : 'New Product';
  const description = initialData
    ? 'Edit your product'
    : 'Create a new product';
  const action = initialData ? 'Save changes' : 'Create';

  const selectFormMap = [
    {
      name: 'categoryId',
      label: 'Category',
      options: categories,
      placeholder: 'Select a category',
    },
    {
      name: 'colorId',
      label: 'Color',
      options: colors,
      placeholder: 'Select a color',
    },
    {
      name: 'sizeId',
      label: 'Size',
      options: sizes,
      placeholder: 'Select a size',
    },
  ];

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          sellPrice: parseFloat(String(initialData?.sellPrice)),
          buyPrice: parseFloat(String(initialData?.buyPrice)),
        }
      : {
          name: '',
          images: [],
          categoryId: '',
          colorId: '',
          sizeId: '',
          isFeatured: false,
          isArchived: false,
          sellPrice: 0,
          buyPrice: 0,
        },
  });

  const onSubmit = async (values: ProductFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        const request = axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          values
        );

        await toast.promise(request, {
          loading: 'Saving changes...',
          success: 'Changes saved!',
          error: 'Error saving changes',
        });
      } else {
        const request = axios.post(`/api/${params.storeId}/products`, values);

        await toast.promise(request, {
          loading: 'Creating...',
          success: 'Product created!',
          error: 'Error creating a product',
        });
      }

      router.push(`/${params.storeId}/products/`);
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
        `/api/${params.storeId}/products/${params.productId}`
      );

      await toast.promise(request, {
        loading: 'Deleting product...',
        success: 'Product deleted!',
        error: 'Error deleting product',
      });

      router.push(`/${params.storeId}/products/`);
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
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map(image => image.url)}
                    disabled={loading}
                    onChange={url => {
                      field.onChange([...field.value, { url }]);
                    }}
                    onRemove={url => {
                      field.onChange([
                        ...field.value.filter(image => image.url !== url),
                      ]);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buy price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Buying price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sellPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sell price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Selling price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectFormMap.map(({ name, label, options, placeholder }) => (
              <FormField
                key={name}
                control={form.control}
                // @ts-ignore
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        // @ts-ignore
                        defaultValue={field.value}
                        // @ts-ignore
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={placeholder}
                            // @ts-ignore
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map(option => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will be shown in the homepage
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will be be removed from the store view
                    </FormDescription>
                  </div>
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

export default ProductForm;
