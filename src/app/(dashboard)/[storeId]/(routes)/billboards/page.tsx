import React from 'react';

import ClientBillboard from './components/client-billboard';

const BillboardsPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientBillboard />
      </div>
    </div>
  );
};

export default BillboardsPage;
