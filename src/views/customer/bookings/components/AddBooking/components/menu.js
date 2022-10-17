import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

const styles = {
    card: {
        '&:hover': {
            backgroundColor: "#efefef",
            cursor: 'pointer'
        },
    }
};

const useStyles = makeStyles(styles);

export default function AddNewBookingMenu({ setRender, setNewRender }) {
    const classes = useStyles();

    return (
        <>
            <div onClick={() => setRender('all')} style={{ cursor: 'pointer' }} className="d-flex mb-2 align-items-center">
                <h5>{"<- Go Back"}</h5>
            </div>
            <div className="d-flex w-100 mb-3 justify-content-between">
                <Paper onClick={() => setNewRender('flight')} className={`d-flex flex-column p-5 justify-content-center align-items-center ${classes.card}`} style={{ width: '49%' }} elevation={3}>
                    <i className='fa fa-plane mb-3' style={{ fontSize: 48 }} />
                    <h2>Book Flight</h2>
                </Paper>
                <Paper onClick={() => setNewRender('hotel')} className={`d-flex flex-column p-5 justify-content-center align-items-center ${classes.card}`} style={{ width: '49%' }} elevation={3}>
                    <i className='fa fa-hotel mb-3' style={{ fontSize: 48 }} />
                    <h2>Book Hotel</h2>
                </Paper>
            </div>
            <div className="d-flex mb-4 w-100 justify-content-between">
                <Paper onClick={() => setNewRender('car')} className={`d-flex flex-column p-5 justify-content-center align-items-center ${classes.card}`} style={{ width: '49%' }} elevation={3}>
                    <i className='fa fa-car mb-3' style={{ fontSize: 48 }} />
                    <h2>Book Car</h2>
                </Paper>
                <Paper onClick={() => setNewRender('package')} className={`d-flex flex-column p-5 justify-content-center align-items-center ${classes.card}`} style={{ width: '49%' }} elevation={3}>
                    <i className='fa fa-map-marker mb-3' style={{ fontSize: 48 }} />
                    <h2>Book Travel Package</h2>
                </Paper>
            </div>
        </>
    );
}
