import React, { useState } from "react";
import { makeStyles, Paper, Tab, Tabs, Snackbar, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { useQuery } from "react-query";
import { QueryKeys } from "../../service/QueryKeys";
import MuiAlert from '@material-ui/lab/Alert';
import ProductPopUp from "./ProductPopUp";
import OfferList from "../../component/home/OfferList"; 
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '95%',
    marginBottom: "100px",
    marginTop: "40px",
    [theme.breakpoints.down('sm')]: {
      marginTop: "20px",
      marginBottom: "50px",
      width: '100%',
    },
  },
  productContainer: {
    textAlign: "center",
    position: "relative",
    width: "100%",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  productImage: {
    width: "100%",
    height: "auto",
    maxWidth: "250px",
    maxHeight: "150px",
  },
  productInfo: {
    position: "absolute",
    top: "115%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    width: "100%",
    paddingBottom: '20px'
  },
  productItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
  },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      spacing={2}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ marginTop: "40px",marginBottom: "40px", width: "100%" }}
      {...other}
    >
      {value === index && children}
    </Grid>
  );
}

export default function ProductList({ products, onAddToCart }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { data: categories, isLoading } = useQuery(QueryKeys.CATEGORIES); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery('(min-width: 600px) and (max-width: 1200px)');

  const [showSuccess, setShowSuccess] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (itemToAdd) => {
    setSnackbarMessage(`${itemToAdd.name} successfully added to cart!`);
    setShowSuccess(true);
    onAddToCart(itemToAdd);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSuccess(false);
  };

  if (isLoading || !categories) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant={isSmallScreen || isMediumScreen ? "scrollable" : "standard"}
          scrollButtons={isSmallScreen || isMediumScreen ? "on" : "off"}
          centered={!isSmallScreen && !isMediumScreen}
        >
          {categories?.map((category, index) => (
            <Tab key={index} label={category.name} />
          ))}
          <Tab label="Offers" />
        </Tabs>
        <div>
          <Grid container spacing={2}>
            {categories.map((category, index) => (
              <TabPanel key={index} value={value} index={index}>
                <Grid container spacing={2}>
                  {category?.products?.map((product) => (
                    <Grid
                      key={product.id}
                      item
                      xs={12} 
                      sm={6}  
                      md={4} 
                      style={{
                        marginBottom: "10px",
                      }}
                      onClick={() => handleProductClick(product)}
                    >
                      <div className={classes.productItem}>
                        <div className={classes.productContainer}>
                          <img
                            src={`../../../products/${product.imageUrl}`}
                            alt={product.name}
                            className={classes.productImage}
                            style={{  marginBottom: '10px', marginTop:'10px' }}
                          />
                          <div className={classes.productInfo}>
                            <div>
                              <Typography style={{ fontWeight: "bold", marginTop: '35px' }}>
                                {product.name}
                              </Typography>
                              <Typography style={{ marginBottom: '10px' }}>
                                {product.price}$
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            ))}
            <TabPanel value={value} index={categories.length}>
              <OfferList onAddToCart={handleAddToCart} />
            </TabPanel>
          </Grid>
        </div>
        {selectedProduct && (
          <ProductPopUp
            product={selectedProduct}
            handleClose={handleClosePopup}
            handleAddToCart={handleAddToCart}
            classes={classes}
          />
        )}
        <Snackbar
          open={showSuccess}
          autoHideDuration={1000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity="success"
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Paper>
    </div>
  );
}
