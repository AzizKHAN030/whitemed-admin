'use client';

import React from 'react';
import { SyncLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className=" h-full flex items-center justify-center">
      <SyncLoader />
    </div>
  );
};

export default Loading;
