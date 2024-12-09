import TabPanel from "./TabPanel";
import {InputAdornment, Paper, TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import DateFilter from "./DateFilter";
import SearchIcon from "@material-ui/icons/Search";
import SimpleBar from "simplebar-react";
import React from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import LoadingButton from "./LoadingButton";
import OrderList from "./OrderList";

const useStyles = makeStyles((theme) => ({
    filter: {
        padding: theme.spacing(2),
        "& > *": {
            marginRight: theme.spacing(3)
        }
    },
    searchButton: {
        marginLeft: "auto"
    }
}));

export default function OrderTab({index, label, value, data, isLoading, onMoveClick, onEditClick, onDeleteClick, handleSearch, rangeRef, user, setUser, disableMove = false}) {

    const theme = useTheme();
    const classes = useStyles();

    return (
        <SimpleBar style={{maxHeight: "100%"}} autoHide={false}>
            <TabPanel value={value} index={index} dir={theme.direction}>
                <Paper variant="outlined" style={{marginBottom: theme.spacing(2)}}>
                    <Box display="flex" className={classes.filter} flexWrap="wrap">
                        <TextField value={user} onChange={(e) => setUser(e.target.value)} label="Customer" variant="standard" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon/>
                                </InputAdornment>
                            ),
                        }}/>
                        <DateFilter rangeRef={rangeRef}/>
                        <LoadingButton
                            loading={isLoading}
                            variant="outlined"
                            color="primary"
                            onClick={handleSearch}
                            icon={<SearchIcon/>}
                            className={classes.searchButton}
                        >
                            Search
                        </LoadingButton>
                    </Box>
                </Paper>
                <Paper variant="outlined">
                    <OrderList
                        data={data}
                        loading={isLoading}
                        onMoveClick={onMoveClick}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                        moveLabel={label}
                        disableMove={disableMove}
                    />
                </Paper>
            </TabPanel>
        </SimpleBar>
    );
}