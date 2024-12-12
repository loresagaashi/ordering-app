import React, { useState } from 'react';
import { useQuery } from 'react-query';
import MaterialTable from '@material-table/core';
import { QueryKeys } from '../../../service/QueryKeys';
import { OrderDetailService } from '../../../service/OrderDetailService';
import OrderEditDialog from '../../../component/OrderEditDialog';
import { format } from 'date-fns';

const orderDetailService = new OrderDetailService();

const OrdersView = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: orders, isLoading, refetch } = useQuery(QueryKeys.ORDERDETAIL, () =>
    orderDetailService.findAll()
  );

  const handleRowClick = (event, rowData) => {
    setSelectedOrder(rowData);
    setIsDialogOpen(true);
  };

  const columns = [
    { title: 'Order ID', field: 'id' },
    { title: 'Customer', field: 'customer.firstName' },
    { title: 'Status', field: 'status' },
    { title: 'Date', field: 'dateTime',     
      render: (rowData) => format(new Date(rowData.dateTime), 'HH:mm'),
    },
  ];

  return (
    <div>
      <MaterialTable
        title="Orders"
        columns={columns}
        data={orders || []}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        options={{
          search: true,
          sorting: true,
          paging: true,
        }}
      />
      {selectedOrder && (
        <OrderEditDialog
          order={selectedOrder}
          setOrder={setSelectedOrder}
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default OrdersView;
