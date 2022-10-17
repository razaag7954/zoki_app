import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { bookPackage } from 'crud'
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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
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

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function ViewPackage({ setReload, setRender, setNewRender, data, setPackageRender }) {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [description, setDescription] = useState(data.description);
    const [origin, setOrigin] = useState(data.origin);
    const [destination, setDestination] = useState(data.destination);
    const [persons, setPersons] = useState(data.noOfPersons);
    const [days, setDays] = useState(data.days);
    const [nights, setNights] = useState(data.nights);
    const [price, setPrice] = useState(data.price);
    const [checkIn, setCheckIn] = useState(new Date())
    const [checkOut, setCheckOut] = useState(new Date())
    const [tags, setTags] = useState(data.tags);
    const [tagsList, setTagsList] = useState(data.tags);
    const [activities, setActivities] = useState(data.activities);
    const [activitiesList, setActivitiesList] = useState(data.activities);

    const resetHandler = () => {
        setCheckIn(new Date())
        setCheckOut(new Date())
        setNewRender('menu')
        setRender('all')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const payload = {
            _travelPackage: data._id,
            bookingDetail: {
                checkinDate: checkIn,
                checkoutDate: checkOut
            }
        }
        dispatch(setLoading())
        bookPackage(payload)
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
                    enqueueSnackbar('Unable to book package.', { variant: 'error' })
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
                    <GridItem xs={12} sm={12} md={12}>
                        <TextField
                            className='mt-4 w-100'
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            disabled
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <TextField
                            className='mt-4 w-100'
                            label="Origin"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            required
                            disabled
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <TextField
                            className='mt-4 w-100'
                            label="Destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                            disabled
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <TextField
                            className='mt-4 w-100'
                            label="No. of Person"
                            value={persons}
                            onChange={(e) => setPersons(e.target.value)}
                            required
                            disabled
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <TextField
                            className='mt-4 w-100'
                            label="Days"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            required
                            disabled
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <TextField
                            className='mt-4 w-100'
                            label="Nights"
                            value={nights}
                            onChange={(e) => setNights(e.target.value)}
                            required
                            disabled
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <TextField
                            className='mt-4 w-100'
                            label="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            disabled
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <FormControl className='mt-4 w-100'>
                            <InputLabel id="activities-label">Activities</InputLabel>
                            <Select
                                labelId="activities-label"
                                id="activities"
                                multiple
                                value={activities}
                                onChange={(e) => setActivities(e.target.value)}
                                input={<Input id="select-activities" />}
                                disabled
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {selected.map((value, i) => (
                                            <Chip color="secondary" key={i} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {activitiesList.map((a, i) => (
                                    <MenuItem key={i} value={a} style={getStyles(a, activities, theme)}>
                                        {a}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <FormControl className='mt-4 w-100'>
                            <InputLabel id="tags-label">Tags</InputLabel>
                            <Select
                                labelId="tags-label"
                                id="tags"
                                multiple
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                input={<Input id="select-tags" />}
                                disabled
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {selected.map((value, i) => (
                                            <Chip color="primary" key={i} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {tagsList.map((t, i) => (
                                    <MenuItem key={i} value={t} style={getStyles(t, tags, theme)}>
                                        {t}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </GridItem>
                </GridContainer>
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
                <div className="d-flex mt-3 w-100 justify-content-around">
                    <Button style={{ width: '32%' }} round onClick={() => setPackageRender('all')}>
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
