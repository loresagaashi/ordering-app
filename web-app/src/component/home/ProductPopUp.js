import React, { useState } from 'react';
import { Backdrop, Button, Fade, Modal, Typography, makeStyles, Grid } from "@material-ui/core";
import { useQuery } from "react-query";
import { QueryKeys } from "../../service/QueryKeys";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
    padding: theme.spacing(2, 4, 3),
    borderRadius: '20px',
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 800,
      maxHeight: 600,
    },
  },
  productName: {
    marginBottom: '15px',
    fontWeight: 'bold',
    fontFamily: "'Roboto Slab', serif",
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  productImage: {
    width: '100%',
    maxWidth: 300,
    height: 'auto',
    marginRight: '20px',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  priceText: {
    marginRight: 12,
    color: '#FFAC1C',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  bonusPointsText: {
    marginBottom: '5px',
    marginRight: 12,
    fontSize: '0.9rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
    color: theme.palette.type === 'dark' ? '#32de84' : 'green',
  },
  sizeOption: {
    display: 'inline-block',
    margin: '0 10px',
  },
  sizeLabel: {
    display: 'block',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #000',
    lineHeight: '36px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  },
  sizeInput: {
    display: 'none',
    '&:checked + $sizeLabel': {
      backgroundColor: '#FFAC1C',
      color: '#fff',
    },
  },
}));

function ProductPopUp({ product, handleClose, handleAddToCart }) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('Small'); // Default size
  const [menu, setMenu] = useState(false); // Menu option state

  const { data: productsData, isLoading, isError } = useQuery(QueryKeys.PRODUCTS);
  const filteredProducts = productsData ? productsData.filter(product => product.category.name === 'Beverages') : [];

  const calculatePrice = (basePrice, size) => {
    let price = basePrice;
    switch (size) {
      case 'Medium':
        price *= 1.3;
        break;
      case 'Large':
        price *= 1.6;
        break;
      default:
        break;
    }
    return menu ? price + 2.8 : price;
  };

  const onAddToCart = () => {
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: calculatePrice(product.price, size),
      imageUrl: product.imageUrl,
      bonusPoints: product.bonusPoints,
      quantity: quantity,
      menu:menu,
      ...(product.category === 'Beverages' && { size }),
    };

    if (menu) {
      // Add Fries to the cart
      handleAddToCart({
        id: 'fries',
        name: 'Fries',
        price: 2,
        imageUrl: '../../../products/fries.jpeg',
        bonusPoints: 0,
        quantity: 1
      });

      // Add Coca Cola to the cart
      handleAddToCart({
        id: 'coca-cola',
        name: 'Coca Cola',
        price: 1.5,
        imageUrl: '../../../products/coca-cola.jfif',
        bonusPoints: 0,
        quantity: 1
      });
    }

    handleAddToCart(itemToAdd);
    handleClose();
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleMenuChange = () => {
    setMenu(!menu);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={true} // Ensure modal is open based on your implementation
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <div className={classes.modalContent}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', marginTop: '7px' }}>
              &#10006;
            </button>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <img
                  src={`../../../products/${product.imageUrl}`}
                  alt={product.name}
                  className={classes.productImage}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <Typography variant="h4" id="transition-modal-title" className={classes.productName}>
                  {product.name} {menu && "+ Menu"} {product.selected && "(Selected)"}
                </Typography>
                <Typography variant="body1" id="transition-modal-description" style={{ marginBottom: '20px' }}>
                  {product.description}
                </Typography>
                <Typography variant="body1" className={classes.priceText}>
                  Price: ${calculatePrice(product.price, size).toFixed(2)}
                </Typography>
                <Typography variant="body1" className={classes.bonusPointsText}>
                  Bonus points: {product.bonusPoints}
                </Typography>
                {filteredProducts.length > 0 && (
                  <div style={{ marginTop: 20 }}>
                    <Typography variant="body1" style={{ marginBottom: '10px' }}>
                      Select Size:
                    </Typography>
                    <div>
                      <div className={classes.sizeOption}>
                        <input
                          type="radio"
                          id="sizeSmall"
                          name="size"
                          value="Small"
                          className={classes.sizeInput}
                          checked={size === 'Small'}
                          onChange={handleSizeChange}
                        />
                        <label htmlFor="sizeSmall" className={classes.sizeLabel}>
                          S
                        </label>
                      </div>
                      <div className={classes.sizeOption}>
                        <input
                          type="radio"
                          id="sizeMedium"
                          name="size"
                          value="Medium"
                          className={classes.sizeInput}
                          checked={size === 'Medium'}
                          onChange={handleSizeChange}
                        />
                        <label htmlFor="sizeMedium" className={classes.sizeLabel}>
                          M
                        </label>
                      </div>
                      <div className={classes.sizeOption}>
                        <input
                          type="radio"
                          id="sizeLarge"
                          name="size"
                          value="Large"
                          className={classes.sizeInput}
                          checked={size === 'Large'}
                          onChange={handleSizeChange}
                        />
                        <label htmlFor="sizeLarge" className={classes.sizeLabel}>
                          L
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                <div style={{ marginTop: 20 }}>
                  <input
                    type="checkbox"
                    id="menuOption"
                    checked={menu}
                    onChange={handleMenuChange}
                  />
                  <label htmlFor="menuOption">Add Menu (Fries & Coca Cola) for $2.8</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                  <Button variant="outlined" onClick={handleDecreaseQuantity} style={{ marginRight: 10, width: 30, height: 30 }}>
                    -
                  </Button>
                  <Typography variant="body1" style={{ marginRight: 10, fontWeight: 'bold' }}>
                    {quantity}
                  </Typography>
                  <Button variant="outlined" onClick={handleIncreaseQuantity} style={{ width: 30, height: 30, marginRight: 15 }}>
                    +
                  </Button>
                  <Button onClick={onAddToCart} style={{ padding: '4px 13px', background: '#FFAC1C', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '12px' }}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
}

export default ProductPopUp;
