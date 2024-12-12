import React from 'react';
import { makeStyles, Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   total: {
      textAlign: 'right',
      fontWeight: 'bold',
      color: theme.palette.secondary.main,
      marginTop: theme.spacing(2),
   },
}));

export default function OrderLines({ initialOrderLines, selectedProducts, total }) {
  const classes = useStyles();

  return (
   <div>
      <Typography variant="h6">Order Lines</Typography>
      <List>
         {initialOrderLines.map((line, index) => (
            <React.Fragment key={index}>
            <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
               <ListItemText
                  primary={
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{line.product?.name}</span>
                        <span>{`${line.quantity} x ${line.price.toFixed(2)}$`}</span>
                     </div>
                  }
                  primaryTypographyProps={{ variant: 'body1' }}
                  secondary={`${line.amount}$`}
                  secondaryTypographyProps={{ variant: 'body1', align: 'right' }}
               />
            </ListItem>
            <hr />
            </React.Fragment>
          ))}
      </List>
      {selectedProducts.length > 0 && (
         <>
            {selectedProducts.map((product, index) => (
               <ListItem key={`selected-${index}`}>
               <Grid container spacing={2}>
                  <Grid item xs={8}>
                     <Typography variant="body1">{product.name}</Typography>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: 'right' }}>
                     <Typography variant="body2">FREE</Typography>
                  </Grid>
               </Grid>
               </ListItem>
            ))}
         <hr/>
         </>
      )}

      <Typography variant="body1" className={classes.total}>
         Total: {total}$
      </Typography>
   </div>
  );
}
