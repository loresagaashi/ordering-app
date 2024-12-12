import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextareaAutosize,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Snackbar,
  Checkbox,
  Modal,
  Grid,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { QueryKeys } from "../../service/QueryKeys";
import useUser from "../../hooks/useUser";
import { OrderDetailService } from "../../service/OrderDetailService";
import useCities from "../../hooks/useCities";
import OrderLines from "./OrderLines";
import ProductListWithBonusPoints from "./ProductListWithBonusPoints";
import { CustomerService } from "../../service/CustomerService";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  section: {
    width: "100%",
    padding: theme.spacing(2),
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "4px",
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      width: "48%",
      marginBottom: 0,
    },
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
  },
  formControlLabel: {
    marginRight: theme.spacing(15),
  },
  formControl: {
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
    "@media (max-width: 320px) and (max-height: 608px)": {
      fontSize: "10px",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
    "@media (max-width: 320px) and (max-height: 608px)": {
      fontSize: "10px",
    },
  },
  notes: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "4px",
  },
  total: {
    textAlign: "right",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    marginTop: theme.spacing(2),
  },
  errorMessage: {
    color: "red",
    marginTop: theme.spacing(1),
  },
  freeProductButton: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
    "@media (max-width: 320px) and (max-height: 608px)": {
      fontSize: "10px",
    },
  },
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const orderDetailService = new OrderDetailService();
const customerService = new CustomerService();

export default function OrderDetails({
  orderDetails,
  total,
  setShowModal,
  handleOrderIsDone,
}) {
  const initialOrderLines = JSON.parse(localStorage.getItem("lines")) || [];

  const classes = useStyles();
  const { user, setUser } = useUser();
  const [city, setCity] = useState("");
  const { cities } = useCities();
  const [isEditing, setIsEditing] = useState(false);
  const [editedSuccessfully, setEditedSuccessfully] = useState(false);
  const [editFailed, setEditFailed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { mutateAsync: createOrder, isLoading } = useMutation((orderDetails) =>
    orderDetailService.create(orderDetails),
  );
  const [checklist, setChecklist] = useState([]);
  const [checklistValues, setChecklistValues] = useState([]);
  const [totalBonusPoints, setTotalBonusPoints] = useState(0);
  const [showFreeItems, setShowFreeItems] = useState(false);
  const [freeItems, setFreeItems] = useState([]);
  const [freeProductMessage, setFreeProductMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(() => {
    const savedProducts = localStorage.getItem("selectedProducts");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const { data: productsData } = useQuery(QueryKeys.PRODUCTS);
  const { mutateAsync: updateCustomer } = useMutation(
    (cust) => customerService.update(cust),
    {
      onSuccess: (data) => {
        console.log("updated here", data);
      },
      onError: (e) => console.log(e),
    },
  );
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    let message = "";
    if (totalBonusPoints >= 100) {
      message = "You can get 4 free products!";
    } else if (totalBonusPoints >= 51) {
      message = "You can get 2 free products!";
    } else if (totalBonusPoints >= 50) {
      message = "You can get 1 free product!";
    }
    setFreeProductMessage(message);
  }, [totalBonusPoints]);

  const handleFreeProduct = () => {
    const numberOfFreeProducts =
      totalBonusPoints >= 100
        ? 4
        : totalBonusPoints >= 51
          ? 2
          : totalBonusPoints >= 50
            ? 1
            : 0;

    setShowFreeItems(true);
    handleOpenModal();
  };

  useEffect(() => {
    if (user) {
      setFirstName(user?.user?.firstName);
      setLastName(user.user.lastName);
      setEmail(user?.user?.email);
      setPhoneNumber(user?.user?.phoneNumber);
      setCity(user?.user?.city?.name);
      setTotalBonusPoints(user?.user?.totalBonusPoints);
    }
  }, [user]);

  const saveOrder = async (order) => {
    try {
      if (user && user.user) {
        const updatedUser = {
          ...user.user,
          totalBonusPoints:
            freeItems.length > 2
              ? user.user.totalBonusPoints - 100
              : freeItems.length >= 1
                ? user.user.totalBonusPoints - 50
                : user.user.totalBonusPoints,
        };
        await updateCustomer(updatedUser);
        const userLocalStorage = {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user: { ...updatedUser },
        };
        setUser(userLocalStorage);
        setIsEditing(false);
        setEditedSuccessfully(true);
      }

      await createOrder(order);

      localStorage.removeItem("lines");
      localStorage.removeItem("selectedProducts");
      setSelectedProducts([]);
      handleOrderIsDone();
      setShowModal(false);
      setError(false);
      setNotes("");
      setPaymentType("");
    } catch (error) {
      setEditFailed(true);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (
      firstName &&
      lastName &&
      email &&
      address &&
      phoneNumber &&
      city &&
      paymentType
    ) {
      setMessage("Order submitted successfully!");
      setOpen(true);

      let order;
      if (user && user.user) {
        order = {
          status: "IN_PROGRESS",
          dateTime: new Date(),
          startDateTime: new Date(),
          endDateTime: null,
          total: total,
          lines: [
            ...initialOrderLines,
            ...freeItems.map((item) => ({
              product: item,
              price: 0,
              quantity: 1,
              amount: 0,
              notes: "-",
            })),
          ],
          customer: {
            ...user.user,
            totalBonusPoints:
              freeItems.length > 2
                ? user.user.totalBonusPoints - 100
                : freeItems.length >= 1
                  ? user.user.totalBonusPoints - 50
                  : user.user.totalBonusPoints,
          },

          paymentType: paymentType,
          notes: notes,
          address: address,
          city: city?.city,
        };
      } else {
        order = {
          status: "IN_PROGRESS",
          dateTime: new Date(),
          startDateTime: new Date(),
          endDateTime: null,
          total: total,
          lines: [
            ...initialOrderLines,
            ...freeItems.map((item) => ({
              product: item,
              price: 0,
              quantity: 1,
              amount: 0,
              notes: "-",
            })),
          ],
          
          paymentType: paymentType,
          notes: notes,
          address: address,
          city: city?.city,
        };
      }

      try {
        await saveOrder(order);

        if (paymentType === "CARD") {
          const paymentLinkResponse = await axios.post(
            "http://localhost:8080/api/payment/create-link",
            order,
          );

          const paymentResponse = paymentLinkResponse.data;

          if (paymentResponse && paymentResponse.payment_url) {
            window.location.href = paymentResponse.payment_url;
            return;
          }
        }
        setMessage("Order submitted successfully!");
        setOpen(true);
      } catch (error) {
        setMessage(error.message);
        setOpen(true);
        setError(true);
      }
    } else {
      setMessage("Please fill in all the fields.");
      setOpen(true);
      setError(true);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value.trim();
    const [first, last] = value.split(" ");
    setFirstName(first || "");
    setLastName(last || "");
    if (!first || !last) {
      setNameError("Please provide both first name and last name.");
    } else {
      setNameError("");
    }
  };

  const handleItemChange = (value, index) => {
    const newChecklist = [...checklist];
    newChecklist[index] = value;
    setChecklist(newChecklist);
  };

  const handleChecklistChange = (value, index) => {
    const newChecklistValues = [...checklistValues];
    newChecklistValues[index] = value;
    setChecklistValues(newChecklistValues);
  };

  const handleAddItem = () => {
    setChecklist([...checklist, ""]);
    setChecklistValues([...checklistValues, false]);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onAddFreeItem = (selectedFreeItem) => {
    setFreeItems([...freeItems, ...selectedFreeItem]);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const onAddToCart = (selectedProducts) => {
    setSelectedProducts(selectedProducts);
    const selectedFreeProducts = productsData.filter((product) =>
      selectedProducts.some((p) => p.id === product.id),
    );

    const numberOfFreeProducts =
      totalBonusPoints >= 100
        ? 4
        : totalBonusPoints >= 51
          ? 2
          : totalBonusPoints >= 50
            ? 1
            : 0;

    if (selectedFreeProducts.length < numberOfFreeProducts) {
      handleAlert(
        `Please select ${numberOfFreeProducts} free product${numberOfFreeProducts > 1 ? "s" : ""}.`,
        "error",
      );
      return;
    }

    const productsToAdd = selectedFreeProducts.slice(
      0,
      numberOfFreeProducts - freeItems.length,
    );

    onAddFreeItem(productsToAdd);
    handleCloseModal();
  };

  const handleAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <div className={classes.header}>
          <Typography variant="h6">Customer Details</Typography>
          <div style={{ textAlign: "right" }}>
            <Typography variant="body1">
              {orderDetails.dateTime}
              <br />
              Status: {orderDetails.status}
            </Typography>
          </div>
        </div>

        <TextField
          label="Name and Last Name"
          onChange={handleNameChange}
          fullWidth
          className={classes.input}
          error={!!nameError}
        />
        {nameError && (
          <Typography variant="body2" className={classes.errorMessage}>
            {nameError}
          </Typography>
        )}

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          className={classes.input}
        />

        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          className={classes.input}
        />

        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          className={classes.input}
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="city-select-label">Select City</InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          >
            {cities &&
              cities.map((city) => (
                <MenuItem key={city?.id} value={city?.name}>
                  {city?.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <Typography variant="body1">Bonus Points:</Typography>
          <Typography
            variant="body2"
            style={{ margin: "10px", fontWeight: "bold", fontSize: "16px" }}
          >
            {totalBonusPoints}
          </Typography>
          {totalBonusPoints >= 50 && (
            <div>
              <Button
                className={classes.freeProductButton}
                onClick={handleFreeProduct}
                variant="contained"
                size="medium"
                style={{ backgroundColor: "#4CAF50", color: "#fff" }}
              >
                Get something free
              </Button>
              {freeProductMessage && (
                <Typography
                  variant="body2"
                  style={{ marginTop: "10px", color: "green" }}
                >
                  {freeProductMessage}
                </Typography>
              )}
              <ProductListWithBonusPoints
                open={modalOpen}
                onClose={handleCloseModal}
                products={productsData || []}
                onAddToCart={onAddToCart}
                maxSelectableProducts={
                  totalBonusPoints >= 100
                    ? 4
                    : totalBonusPoints >= 51
                      ? 2
                      : totalBonusPoints >= 50
                        ? 1
                        : 0
                }
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                freeItems={freeItems}
                onAddFreeItem={onAddFreeItem}
              />
            </div>
          )}
        </div>

        <TextareaAutosize
          aria-label="order-notes"
          minRows={3}
          placeholder="Enter notes here"
          style={{ marginTop: "10px" }}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Typography variant="body2" color="textSecondary">
          Like: Add pickles for extra flavor!
        </Typography>

        <div>
          <Typography variant="body1" style={{ marginTop: "15px" }}>
            Checklist:
          </Typography>
          <List>
            {checklist.map((item, index) => (
              <ListItem key={index}>
                <Checkbox
                  checked={checklistValues[index]}
                  onChange={(e) =>
                    handleChecklistChange(e.target.checked, index)
                  }
                  color="primary"
                  disabled={!item}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  value={item}
                  onChange={(e) => handleItemChange(e.target.value, index)}
                  placeholder="Enter name"
                  size="small"
                />
              </ListItem>
            ))}
            <ListItem>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddItem}
              >
                Add People
              </Button>
            </ListItem>
          </List>
        </div>

        <Typography variant="body1" style={{ marginTop: "16px" }}>
          Choose payment method
        </Typography>
        <RadioGroup
          aria-label="payment-type"
          name="payment-type"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className={classes.radioGroup}
        >
          <FormControlLabel
            value="CASH"
            control={<Radio />}
            label="Cash"
            className={classes.formControlLabel}
          />
          <FormControlLabel
            value="CARD"
            control={<Radio />}
            label="Card"
            className={classes.formControlLabel}
          />
        </RadioGroup>

        <div className={classes.buttonContainer}>
          <Button className={classes.button} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>

      <div className={classes.section}>
        <OrderLines
          initialOrderLines={initialOrderLines}
          selectedProducts={selectedProducts}
          freeItems={freeItems}
          total={total}
        />
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? "error" : "success"}>
          {message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}