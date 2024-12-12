import React, { useState, useEffect } from 'react';
import { Modal, Grid, Typography, Button, Checkbox } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    outline: "none",
    minWidth: "300px",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  modalTitle: {
    marginBottom: theme.spacing(2),
  },
  modalButton: {
    background: '#FFAC1C', 
    color: 'white',
    '&:hover': {
      background: '#CD7F32',
    },
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  productItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
    paddingBottom: theme.spacing(2),
  },
  productImage: {
    width: "150px",
    height: "100px",
    borderRadius: "4px",
    marginBottom: theme.spacing(1),
  },
  productInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  productName: {
    fontSize: "15px",
    textAlign: "left",
  },
  checkboxContainer: {
    marginLeft: theme.spacing(1),
  },
}));

const RedCheckbox = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ProductListWithBonusPoints = ({ open, onClose, products, onAddToCart, maxSelectableProducts, selectedProducts, setSelectedProducts }) => {
  const classes = useStyles();
  const [localSelectedProducts, setLocalSelectedProducts] = useState([...selectedProducts]);

  useEffect(() => {
    setLocalSelectedProducts([...selectedProducts]);
  }, [open, selectedProducts]);

  const handleProductSelect = (product) => {
    if (localSelectedProducts.some((p) => p.id === product.id)) {
      setLocalSelectedProducts(localSelectedProducts.filter((p) => p.id !== product.id));
    } else if (localSelectedProducts.length < maxSelectableProducts) {
      setLocalSelectedProducts([...localSelectedProducts, product]);
    }
  };

  const handleAddToCart = () => {
    setSelectedProducts(localSelectedProducts);
    localStorage.setItem('selectedProducts', JSON.stringify(localSelectedProducts));
    onAddToCart(localSelectedProducts);
    setLocalSelectedProducts([]);
  };
  
  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.modalContent}>
        <Typography variant="h6" className={classes.modalTitle}>
          Select Products
        </Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid
              key={product.id}
              item
              xs={12}
              md={4}
              className={classes.productItem}
              onClick={() => handleProductSelect(product)}
            >
              <img
                src={`../../../products/${product.imageUrl}`}
                alt={product.name}
                className={classes.productImage}
              />
              <div className={classes.productInfo}>
                <Typography className={classes.productName}>
                  {product.name}
                </Typography>
                <div className={classes.checkboxContainer}>
                  {localSelectedProducts.length >= maxSelectableProducts && !localSelectedProducts.some((p) => p.id === product.id) ? (
                    <RedCheckbox
                      checked={localSelectedProducts.some((p) => p.id === product.id)}
                      disabled
                    />
                  ) : (
                    <Checkbox
                      checked={localSelectedProducts.some((p) => p.id === product.id)}
                      color="primary"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  )}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
        <div className={classes.modalButtonContainer}>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            className={classes.modalButton}
          >
            Select
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductListWithBonusPoints;
