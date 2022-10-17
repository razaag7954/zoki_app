import React, { useState, useEffect } from "react";
import ImageGallery from 'react-image-gallery';
// @material-ui/core components
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
// @material-ui/core components
import TextField from "@material-ui/core/TextField";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import SignUpModel from './signupModel'

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

export default function ViewHotel({ data, setHotelRender }) {
    const [signup, setSignup] = useState(false);
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [adult, setAdult] = useState('');
    const [children, setChildren] = useState('');
    const [infant, setInfant] = useState('');
    const [payload, setPayload] = useState('');

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
        setPayload(payload)
        setSignup(true)
    }

    return (
        <form className="container mt-4" onSubmit={submitHandler}>
            <h3 className='text-center my-4'>{data.name}</h3>
            {/* {data.imgGallery.length !== 0 && <ImageGallery */}
            <ImageGallery
                className='w-100 p-0'
                showThumbnails={false}
                showNav={false}
                showBullets={true}
                autoPlay={true}
                showPlayButton={false}
                items={images}
            // items={data.imgGallery}
            />
            {/* />} */}
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
                <div className="d-flex mt-3 w-100 justify-content-around">
                    <Button style={{ width: '32%' }} round onClick={() => setHotelRender('all')}>
                        Go Back
                    </Button>
                    <Button style={{ width: '32%' }} type='submit' color="success" round>
                        Book Now
                    </Button>
                </div>
            </div>
            <SignUpModel bookingDetails={payload} signup={signup} setSignup={setSignup} />
        </form>
    );
}
