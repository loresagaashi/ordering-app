import React, {useEffect, useRef, useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useMutation} from "react-query";
import InProgressIcon from '@material-ui/icons/HourglassEmptyOutlined';
import CompletedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import {format} from "date-fns";
import { OrderDetailService } from "../../../service/OrderDetailService";
import OrderTab from "../../../component/OrderTab";
import OrderEditDialog from "../../../component/OrderEditDialog";
import DriveEtaIcon from '@material-ui/icons/DriveEta';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function getTabColor(value, theme) {
  switch (value) {
    case 0:
      return {color: theme.palette.primary.main}
    case 1:
      return {color: theme.palette.secondary.main}
    case 2:
      return {color: theme.palette.success.main}
    case 3:
      return {color: theme.palette.success.main}
    default:
      throw new Error("Tab color not specified!");
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    height: `calc(100% - 65px)`,
    "& > div": {
      height: "calc(100% - 54px) !important"
    },
    "& .react-swipeable-view-container": {
      height: "100%",
    }
  },
  tabHeader: {
    height: 54,
    "& *.Mui-selected": {
      color: props => props.color,
    },
    "& *.MuiTab-wrapper": {
      flexDirection: "row",
      "& :first-child": {
        marginRight: theme.spacing(1)
      }
    },
    "& *.MuiTab-labelIcon": {
      minHeight: 54,
    }
  },
  tabIndicator: {
    backgroundColor: props => props.color
  },
  swipeableViews: {
    height: "100%",
    overflow: "hidden !important",
    backgroundColor: theme.palette.background.default
  }
}));

const statusByIndex = new Map([[0, "IN_PROGRESS"], [1, "PROCESSING"], [2, "DELIVERING"], [3, "COMPLETED"]]);
const ordersService = new OrderDetailService();

export default function OrdersPage() {
  const theme = useTheme();
  const rangeRef = useRef();
  const [order, setOrder] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [value, setValue] = useState(0);
  const [user, setUser] = useState('');
  const {mutate: searchOrders, data, isLoading} = useMutation(({
                                                                       status,
                                                                       user,
                                                                       from,
                                                                       to
                                                                     }) => ordersService.findByDateBetweenAndStatusAndUser(status, user, from, to));
  const {mutate: moveToProgress} = useMutation(order => ordersService.moveToProgress(order), {
    onSuccess: () => {
      console.log('Moved to Progress');
      handleSearch();
    }
  });
  const {mutate: moveToProcessing} = useMutation(order => ordersService.moveToProcessing(order), {
    onSuccess: () => {
      console.log('Moved to Processing');
      handleSearch();
    }
  });
  const {mutate: moveToDelivering} = useMutation(order => ordersService.moveToDelivering(order), {
    onSuccess: () => {
      console.log('Moved to Delivering');
      handleSearch();
    }
  });
  const {mutate: moveToCompleted} = useMutation(order => ordersService.moveToCompleted(order), {
    onSuccess: () => {
      console.log('Moved to Completed');
      handleSearch();
    }
  });

  
  const {mutate: deleteOrder} = useMutation(id => ordersService.delete(id), {
    onSuccess: handleSearch
  });
  const classes = useStyles(getTabColor(value, theme));

  useEffect(() => {
    handleSearch()
  }, [value]);

  function handleMoveToProgress(appointment) {
    return moveToProgress(appointment);
  }
  function handleMoveToProcessing(appointment) {
    return moveToProcessing(appointment);
  }
  function handleMoveToDelivering(appointment) {
    return moveToDelivering(appointment);
  }
  function handleMoveToCompleted(appointment) {
    return moveToCompleted(appointment);
  }

  function handleSearch() {
    const filters = {
      status: statusByIndex.get(value),
      user: user,
      from: format(rangeRef.current.from, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"), 
      to: format(rangeRef.current.to, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")  
    };  
    searchOrders(filters)
  }

  function handleEditClick(order) {
    setOrder(order);
    setOpenEdit(true);
  }

  function handleDeleteClick(order) {
    console.log("Deleting appointment: ", order);
    deleteOrder(order.id)
  }
  console.log('data', data)

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          TabIndicatorProps={{className: classes.tabIndicator}}
          className={classes.tabHeader}
        >
          <Tab label="In Progress" icon={<InProgressIcon/>} {...a11yProps(0)} />
          <Tab label="Processing" icon={<AutorenewIcon/>} {...a11yProps(1)} className={classes.inProgressTab}/>
          <Tab label="Delivering" icon={<DriveEtaIcon/>} {...a11yProps(2)} className={classes.inProgressTab}/>
          <Tab label="Completed" icon={<CompletedIcon/>} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={setValue}
        slideClassName={classes.swipeableViews}
      >
        {/* <OrderTab index={0}
                        label="In Progress"
                        value={value}
                        rangeRef={rangeRef}
                        data={data}
                        user={user}
                        setUser={setUser}
                        isLoading={isLoading}
                        onMoveClick={handleMoveToProgress}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                        handleSearch={handleSearch}
        /> */}
        <OrderTab index={0}
                        label="Processing"
                        value={value}
                        rangeRef={rangeRef}
                        data={data}
                        user={user}
                        setUser={setUser}
                        isLoading={isLoading}
                        onMoveClick={handleMoveToProcessing}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                        handleSearch={handleSearch}
        />
        <OrderTab index={1}
                  label="Delivering"
                        value={value}
                        rangeRef={rangeRef}
                        data={data}
                        user={user}
                        setUser={setUser}
                        isLoading={isLoading}
                        onMoveClick={handleMoveToDelivering}
                        handleSearch={handleSearch}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
        />
        <OrderTab index={2}
                  label="Completed"
                        value={value}
                        rangeRef={rangeRef}
                        data={data}
                        user={user}
                        setUser={setUser}
                        isLoading={isLoading}
                        onMoveClick={handleMoveToCompleted}
                        handleSearch={handleSearch}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
        />
        <OrderTab index={3}
                  disableMove
                  value={value}
                  rangeRef={rangeRef}
                  data={data}
                  user={user}
                  setUser={setUser}
                  isLoading={isLoading}
                  handleSearch={handleSearch}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
        />
      </SwipeableViews>
      {openEdit && <OrderEditDialog order={order} setOrder={setOrder} open={openEdit} setOpen={setOpenEdit} refetch={handleSearch} />}
    </div>
  );
}