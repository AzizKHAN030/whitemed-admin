'use client';

import React from 'react';
import toast from 'react-hot-toast';

import { Copy, ServerIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';

import { Button } from './ui/button';

interface ApiAlertProps {
  title: string;
  description: string;
  variant?: 'public' | 'admin';
}

const textMap: Record<NonNullable<ApiAlertProps['variant']>, string> = {
  public: 'Public',
  admin: 'Admin',
};
const variantMap: Record<
  NonNullable<ApiAlertProps['variant']>,
  BadgeProps['variant']
> = {
  public: 'secondary',
  admin: 'destructive',
};

const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = 'public',
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success('Copied to clipboard');
  };

  return (
    <Alert>
      <AlertTitle className="flex items-center gap-x-2">
        <ServerIcon className="w-4 h-4" />
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
