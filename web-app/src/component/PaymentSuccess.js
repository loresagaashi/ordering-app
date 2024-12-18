import React from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { green } from "@material-ui/core/colors";
import { Button, Card, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    padding: theme.spacing(2.5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2.5),
    borderRadius: "4px",
  },
  icon: {
    fontSize: "5rem",
    color: green[500],
  },
  title: {
    padding: theme.spacing(2.5, 0),
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  message: {
    padding: theme.spacing(1.5, 0),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  subMessage: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: "1.125rem",
  },
  button: {
    padding: theme.spacing(1.25),
    margin: theme.spacing(2.5, 0),
  },
}));

const PaymentSuccess = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CheckCircleOutlineIcon className={classes.icon} />
        <h1 className={classes.title}>Order Success!</h1>
        <p className={classes.message}>
          Thank you for choosing McDonald's! We appreciate your order.
        </p>
        <p className={classes.subMessage}>Have A Great Day!</p>
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          className={classes.button}
        >
          Go To Home
        </Button>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
