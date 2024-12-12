import React, { useState } from "react";
import { LineChart, axisClasses } from "@mui/x-charts";
import { useTheme, useMediaQuery, MenuItem, IconButton, Popover, Grid } from "@material-ui/core";
import Title from "./Title";
import { useQuery } from "react-query";
import { OrderDetailService } from "../../service/OrderDetailService";
import { QueryKeys } from "../../service/QueryKeys";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const orderDetailService = new OrderDetailService();

function mapOrdersToChartData(orders) {
  const aggregatedData = orders.reduce((acc, order) => {
    const date = new Date(order.dateTime);
    const dateKey = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const hour = date.getHours();
    const time = `${dateKey} ${hour}:00`; // 'YYYY-MM-DD HH:00'
    if (!acc[time]) {
      acc[time] = 0;
    }
    acc[time] += order.total;
    return acc;
  }, {});

  return Object.entries(aggregatedData).map(([time, amount]) => ({ time, amount }));
}

export default function Chart() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedDay, setSelectedDay] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const { data: orders = [] } = useQuery(QueryKeys.ORDERDETAIL, () => orderDetailService.findAll());

  const chartData = mapOrdersToChartData(orders);

  const filteredChartData = selectedDay ? chartData.filter(data => {
    const date = data.time.split(' ')[0];
    return selectedDay === date;
  }) : chartData;

  const handleDayChange = (date) => {
    setSelectedDay(date);
    setAnchorEl(null);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Title>Orders Chart</Title>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="select-day"
            aria-controls="select-day-menu"
            aria-haspopup="true"
            onClick={handlePopoverOpen}
          >
            <ArrowDropDownIcon />
          </IconButton>
          <Popover
            id="select-day-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={() => handleDayChange("")}>All Orders</MenuItem>
            {Array.from(new Set(orders.map(order => new Date(order.dateTime).toISOString().split('T')[0]))).map(date => (
              <MenuItem key={date} onClick={() => handleDayChange(date)}>{date}</MenuItem>
            ))}
          </Popover>
        </Grid>
      </Grid>
      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={filteredChartData}
          margin={{
            top: 16,
            right: isSmallScreen ? 10 : 20,
            left: isSmallScreen ? 50 : 70,
            bottom: isSmallScreen ? 50 : 70,
          }}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "time",
              tickNumber: Math.min(filteredChartData.length, isSmallScreen ? 5 : 10),
              tickLabelStyle: theme.typography.body2,
              label: "Time",
              labelStyle: theme.typography.body1,
            },
          ]}
          yAxis={[
            {
              label: "Sales ($)",
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              tickNumber: 5,
            },
          ]}
          series={[
            {
              dataKey: "amount",
              showMark: true,
              color: theme.palette.primary.light,
              lineStyle: { strokeWidth: 2 },
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: {
              stroke: theme.palette.divider,
            },
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
            [`.${axisClasses.bottom} .${axisClasses.label}`]: {
              transform: "translateY(25px)",
            },
          }}
          tooltip={{
            show: true,
            formatter: (value) => `$${value.toFixed(2)}`,
          }}
        />
      </div>
    </React.Fragment>
  );
}
