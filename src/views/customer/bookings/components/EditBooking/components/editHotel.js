import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { bookHotel } from 'crud'
import ImageGallery from 'react-image-gallery';
// @material-ui/core components
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "redux/actions";
// @material-ui/core components
import TextField from "@material-ui/core/TextField";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

export default function ViewHotel({ setReload, setRender, setNewRender, data, setHotelRender }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [adult, setAdult] = useState('');
    const [children, setChildren] = useState('');
    const [infant, setInfant] = useState('');

    const resetHandler = () => {
        setCheckIn(new Date());
        setCheckOut(new Date());
        setAdult('');
        setChildren('');
        setInfant('');
        setNewRender('menu')
        setRender('all')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (parseInt(adult) < 1) {
            enqueueSnackbar('Adult must be greater than or equal to 1', { variant: 'info' })
            return
        }
        const payload = {
            _hotel: data._id,
            bookingDetail: {
                checkinDate: checkIn,
                checkoutDate: checkOut,
                adults: adult,
                children: children,
                infants: infant
            }
        }
        dispatch(setLoading())
        bookHotel(payload)
            .then(res => {
                // console.log(res.data)
                enqueueSnackbar('Success, New Booking Created.', { variant: 'success' })
                dispatch(unsetLoading())
                resetHandler()
                setReload(prev => prev + 1)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    history.push('/401')
                } else {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    enqueueSnackbar('Unable to book hotel.', { variant: 'error' })
                }
                dispatch(unsetLoading())
            })
    }

    return (
        <form onSubmit={submitHandler}>
            <h3 className='text-center mb-2'>{data.name}</h3>
            {data.imgGallery.length !== 0 && <ImageGallery
                className='w-100 p-0'
                showThumbnails={false}
                showNav={false}
                showBullets={true}
                autoPlay={true}
                showPlayButton={false}
                items={data.imgGallery}
            />}
            <div className="d-flex flex-column p-4 w-100">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className='mt-4 w-100'
                                format="MM/dd/yyyy"
                                label="Check In"
                                value={checkIn}
                                onChange={(date) => setCheckIn(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                minDate={new Date()}
                                required
                            />
                        </MuiPickersUtilsProvider>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className='mt-4 w-100'
                                format="MM/dd/yyyy"
                                label="Check Out"
                                value={checkOut}
                                onChange={(date) => setCheckOut(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                minDate={new Date()}
                                required
                            />
                        </MuiPickersUtilsProvider>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <TextField
                            className='mt-4 w-100'
                            label="Adults"
                            value={adult}
                            onChange={(e) => setAdult(e.target.value)}
                            type='number'
                            required
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <TextField
                            className='mt-4 w-100'
                            label="Children"
                            value={children}
                            onChange={(e) => setChildren(e.target.value)}
                            type='number'
                            required
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <TextField
                            className='mt-4 w-100'
                            label="Infant"
                            value={infant}
                            onChange={(e) => setInfant(e.target.value)}
                            type='number'
                            required
                        />
                    </GridItem>
                </GridContainer>
                {/* <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <TextField
                            className='mt-4 w-100'
                            label="Other Specifications"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        />
                    </GridItem>
                </GridContainer> */}
                <div className="d-flex mt-3 w-100 justify-content-around">
                    <Button style={{ width: '32%' }} round onClick={() => setHotelRender('all')}>
                        Go Back
                    </Button>
                    <Button style={{ width: '32%' }} type='submit' color="success" round>
                        Book Now
                    </Button>
                </div>
            </div>
        </form>
    );
}
