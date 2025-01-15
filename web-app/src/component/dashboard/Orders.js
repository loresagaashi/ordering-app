import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import Title from './Title';
import { format } from "date-fns";

export default function Orders({ orders, visibleOrders, showMoreOrders }) {
  let orderNumber = 0;

  const [expandedOrderId, setExpandedOrderId] = React.useState(null);

  const toggleOrderLines = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MM/dd/yyyy HH:mm');
  };

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small" sx={{ backgroundColor: isDarkMode ? '#424242' : 'inherit' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>ID</TableCell>
            <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>Date</TableCell>
            <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>Customer</TableCell>
            <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>Email</TableCell>
            <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>Address</TableCell>
            <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>City</TableCell>
            {/* <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>Payment Method</TableCell> */}
            <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>Status</TableCell>
            <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }} align="right">Sale Amount</TableCell>
            <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>Order Lines</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders.length > 0 ? (
            orders.slice(0, visibleOrders).map((order) => {
              orderNumber++;
              const isExpanded = expandedOrderId === order.id;
              return (
                <React.Fragment key={order.id}>
                  <TableRow>
                    <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>{order.id}</TableCell>
                    <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>{formatDate(order.dateTime)}</TableCell>
                    <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>{`${order.customer.firstName} ${order.customer.lastName}`}</TableCell>
                    <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>{order.customer.email}</TableCell>
                    <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>{order.address}</TableCell>
                    <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>{order.customer.city?.name}</TableCell>
                    {/* <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>{order.paymentType}</TableCell> */}
                    <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>{order.status}</TableCell>
                    <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }} align="right">{`$${order.total.toFixed(2)}`}</TableCell>
                    <TableCell>
                      <Paper
                        elevation={3}
                        sx={{
                          padding: '10px',
                          background: isDarkMode ? '#616161' : '#f0f0f0',
                          cursor: 'pointer',
                        }}
                        onClick={() => toggleOrderLines(order.id)}
                      >
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            textDecoration: 'none', 
                            color: isDarkMode ? '#fff' : theme.palette.primary.main 
                          }}
                        >
                          {isExpanded ? 'Hide Lines' : 'Show Lines'}
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={10}>
                        <Paper elevation={3} sx={{ padding: '10px', background: isDarkMode ? '#757575' : '#f9f9f9' }}>
                          <Table size="small" sx={{ backgroundColor: isDarkMode ? '#424242' : 'inherit' }}>
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : 'inherit' }}>Product</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : 'inherit' }}>Quantity</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : 'inherit' }} align="right">Total Price</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {order.lines.map((line, index) => (
                                <TableRow key={index}>
                                  <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>{line.product.name}</TableCell>
                                  <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>{line.quantity}</TableCell>
                                  <TableCell sx={{ color: isDarkMode ? '#fff' : 'inherit' }} align="right">{`${line.quantity} x ${line.price.toFixed(2)}`} {' - '} {`${(line.quantity * line.price).toFixed(2)}$`}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7}>No orders found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {orders && visibleOrders < orders.length && (
        <Link color="primary" href="#" onClick={showMoreOrders} sx={{ mt: 3 }} style={{ fontSize: '16px' }}>
          See more orders
        </Link>
      )}
    </React.Fragment>
  );
}
