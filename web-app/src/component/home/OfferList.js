import React, { useState } from "react";
import { makeStyles, Paper, Snackbar, Grid, Typography } from "@material-ui/core";
import { useQuery } from "react-query";
import { QueryKeys } from "../../service/QueryKeys";
import MuiAlert from "@material-ui/lab/Alert";
import OfferPopUp from "./OfferPopUp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '95%',
    padding: theme.spacing(4),
    marginTop: "20px",
    marginBottom: "40px",
  },
  gridItem: {
    marginBottom: "60px",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    width: "100%",
    cursor: "pointer",
  },
  image: {
    width: "250px",
    height: "150px",
  },
  infoContainer: {
    position: "absolute",
    top: "115%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    width: "100%",
  },
  name: {
    fontWeight: "bold",
    marginTop: "15px",
  }
}));

export default function OfferList({ onAddToCart }) {
  const classes = useStyles();
  const { data: offers } = useQuery(QueryKeys.OFFER);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOfferClick = (offers) => {
    setSelectedOffer(offers);
  };

  const handleClosePopup = () => {
    setSelectedOffer(null);
  };

  const handleAddToCart = (itemToAdd) => {
    setSnackbarMessage(`${itemToAdd.name} successfully added to cart!`);
    setShowSuccess(true);
    onAddToCart(itemToAdd);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccess(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} style={{ marginTop: "80px", marginBottom: "40px" }}>
          {offers?.map((offers) => (
            <Grid
              key={offers.id}
              item
              xs={12} sm={6} md={4}
              className={classes.gridItem}
              onClick={() => handleOfferClick(offers)}
            >
              <img
                src={`../../../products/${offers.imageUrl}`}
                alt={offers.name}
                className={classes.image}
              />
              <div className={classes.infoContainer}>
                <Typography className={classes.name}>{offers.name}</Typography>
                <Typography>{offers.price}$</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
        {selectedOffer && (
          <OfferPopUp
            offer={selectedOffer}
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