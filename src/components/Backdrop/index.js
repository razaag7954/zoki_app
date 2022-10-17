import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 101,
        color: '#fff',
    },
}));

export default function SimpleBackdrop({ children }) {
    const classes = useStyles();
    const loading = useSelector(({ user: { isLoading } }) => isLoading)

    return (
        <div>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color='inherit' />
            </Backdrop>
            {children}
        </div>
    );
}
