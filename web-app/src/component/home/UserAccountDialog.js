import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AppBar, Dialog, useMediaQuery } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../TabPanel";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0, 4, 4, 4),
    }
}));

export default function UserAccountDialog({ open, setOpen, onSuccess, isLoading }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleOnSuccess(user) {
        setOpen(false);
        onSuccess(user);
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <AppBar position="static" color="default" className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Sign In" />
                    <Tab label="Sign Up" />
                </Tabs>
                <TabPanel value={value} index={0}>
                </TabPanel>
                <TabPanel value={value} index={1}>
                </TabPanel>
            </AppBar>
        </Dialog>
    );
}
