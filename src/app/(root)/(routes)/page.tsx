'use client';

import { useEffect } from 'react';

import { useStoreModal } from '@/hooks/use-store-modal';

export function SetupPage() {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}

export default SetupPage;
