import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {Skeleton} from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";
import {format, parseISO} from "date-fns";
import useAppBarHeight from "../hooks/useAppBarHeight";
import OrderTitle from "./OrderTitle";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    tile: {
        width: "30em",
        height: "15em",
        margin: theme.spacing(2),
    },
    dateTypography: {
        display: "inline-block",
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1, 3, 1, 1),
        border: "1px solid " + theme.palette.divider,
        borderBottomRightRadius: "40px",
        borderTop: 0,
        borderLeft: 0
    }
}));

export default function OrderList({data, loading, moveLabel, onMoveClick, onEditClick, onDeleteClick, disableMove}) {

    const minHeight = useAppBarHeight();
    const classes = useStyles({appBarHeight: minHeight});

    const finalData = loading || !data ? {null: new Array(8).fill(undefined)} : data;

    return (
        <Grid container justifyContent="center" className={classes.root}>
            {Object.entries(finalData).map(([date, orders], i) => (
                <React.Fragment key={date + i}>
                    <Grid item xs={12}>
                        {i > 0 && <Divider/>}
                        {date === 'null' ? <Skeleton width="5%"/> :
                            <Typography className={classes.dateTypography} variant="h6" component="span">{format(parseISO(date), "MMM d")}</Typography>}
                    </Grid>
                    {orders.map((order, i) => (order ?
                            <Grid key={i} item>
                                <OrderTitle className={classes.tile}
                                                 order={order}
                                                 moveLabel={moveLabel}
                                                 onMoveClick={onMoveClick}
                                                 onEditClick={onEditClick}
                                                 onDeleteClick={onDeleteClick}
                                                 disableMove={disableMove}/>
                            </Grid>
                            :
                            <Box key={i} className={classes.tile}>
                                <Skeleton width="60%"/>
                                <Skeleton/>
                                <Skeleton variant="rect" height={"10em"}/>
                            </Box>
                    ))}
                </React.Fragment>
            ))}
        </Grid>
    );
}

/*
*/