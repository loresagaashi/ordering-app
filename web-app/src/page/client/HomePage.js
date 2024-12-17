import React, { useState } from "react";
import { Box, makeStyles, Button, Typography } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import ProductList from "../../component/home/ProductList";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import image1 from "../../images/home/8.png";
import image2 from "../../images/home/2.png";
import image3 from "../../images/home/1.png";
import image4 from "../../images/home/9.png";
import ShoppingCart from "../../component/home/ShoppingCart";
import useCart from "../../component/home/useCart";
import OfferList from "../../component/home/OfferList";
import useUser from "../../hooks/useUser";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  buttonContainer: {
    marginTop: "20px",
    marginRight: "20px",
  },
  cartButton: {
    display: "flex",
    alignItems: "center",
    marginRight: '20px',
  },
  totalPrice: {
    marginLeft: theme.spacing(1),
    color: theme.palette.common.white,
  },
  showOffersButton: {
    marginTop: "50px",
    marginBottom: "50px",
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    deleteItemsFromCart,
    total,
  } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const {user} = useUser();

  const items = [
    {
      image: image1,
    },
    {
      image: image2,
    },
    {
      image: image3,
    },
    {
      image: image4,
    },
  
  ];

  const toggleCartDrawer = () => {
    setShowCart(!showCart);
  };

  const toggleShowOffers = () => {
    setShowOffers(!showOffers);
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box className={classes.buttonContainer} display="flex" justifyContent="flex-end" width="100%">
        <Button color="primary" variant="contained" onClick={toggleCartDrawer} className={classes.cartButton}>
          <ShoppingCartIcon />
          <Typography variant="body1" className={classes.totalPrice}>
            {total.toFixed(2)}$
          </Typography>
        </Button>
      </Box>
      <Box style={{ margin: "60px auto", borderRadius: "20px", width: "80%" }}>
        <Carousel>
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </Box>

      <ProductList onAddToCart={handleAddToCart} products={items} />

      <ShoppingCart
        cartItems={cart}
        showCart={showCart}
        toggleCartDrawer={toggleCartDrawer}
        total={total}
        user={user}
        handleRemoveFromCart={handleRemoveFromCart}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleOrderIsDone={deleteItemsFromCart}
      />
    </Box>
  );
}

function Item(props) {
  return (
    <img
      src={props.item.image}
      alt={props.item.name}
      style={{ height: "60vh", width: "100%", borderRadius: "20px" }}
    />
  );
}