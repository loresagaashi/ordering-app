import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import clsx from "clsx";
import AppMenu from "../../component/dashboard/AppMenu";
import { Route, Routes, useLocation } from "react-router-dom";
import CategoriesView from "./categories/CategoriesView";
import ProductsView from "./products/ProductsView";
import UsersView from "./users/UsersView";
import AdminDashboard from "./dashboard/AdminDashboard";
import CustomersView from "./customers/CustomersView";
import AdminsView from "./admins/AdminsView";
import CityView from "./cities/CityView";
import EmployeeView from "./employee/EmployeeView";
import JobPositionView from "./jobPositions/JobPositionView";
import OffersView from "./offers/OffersView";
import StoreHoursView from "./storeHours/StoreHoursView";
import StoreLocationsView from "./storelocations/StoreLocationsView";
import DeliveryHoursView from "./deliveryHours/DeliveryHoursView";
import useUser from "../../hooks/useUser";
import OrdersPage from "./orders/OrdersPage";
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';
import useDarkMode from "../../hooks/useDarkMode";
import {
  useTheme,
} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create([ "width", "margin" ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create([ "width", "margin" ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: `calc(100% - ${drawerWidth}px)`,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function AdminLayout({}) {
  const classes = useStyles();
  const [ open, setOpen ] = React.useState(true);
  const location = useLocation();
  const { user } = useUser();
  const toggleDarkMode = useDarkMode();
  const theme = useTheme();

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const locationPath = location.pathname.split("/admin/")[1];

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {locationPath === 'orderDetails' ? 'Orders' : locationPath.charAt(0).toUpperCase() + locationPath.slice(1)}
          </Typography>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {theme.palette.type === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>}
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon/>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <AppMenu/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        {user?.user?.type === 'Admin' &&
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard/>}/>
            <Route path="/categories" element={<CategoriesView/>}/>
            <Route path="/products" element={<ProductsView/>}/>
            <Route path="/users" element={<UsersView/>}/>
            <Route path="/customers" element={<CustomersView/>}/>
            <Route path="/admins" element={<AdminsView/>}/>
            <Route path="/city" element={<CityView/>}/>
            <Route path="/employees" element={<EmployeeView/>}/>
            <Route path="/jobPositions" element={<JobPositionView/>}/>
            <Route path="/offers" element={<OffersView/>}/>
            <Route path="/storeHours" element={<StoreHoursView/>}/>
            <Route path="/deliveryHours" element={<DeliveryHoursView/>}/>
            <Route path="/storeLocations" element={<StoreLocationsView/>}/>
            {/*<Route path="/orderDetails" element={<OrdersView />} />*/}
            <Route path="/orderDetails" element={<OrdersPage/>}/>
          </Routes>
        }
      </main>
    </div>
  );
}