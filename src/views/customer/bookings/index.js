import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { bookFlight, bookHotel, bookPackage } from 'crud';
import Collapse from '@material-ui/core/Collapse';
import ListAllBookings from './components/ListAllBookings'
import NewBooking from './components/AddBooking'
import EditBooking from './components/EditBooking'

function Bookings() {
    const { enqueueSnackbar } = useSnackbar()
    const [render, setRender] = useState('all')
    const [type, setType] = useState('')
    const [reload, setReload] = useState(1)

    useEffect(() => {
        const bookingType = localStorage.getItem('bookingType')
        const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'))
       
        if (bookingDetails && bookingType) {
            let getRawOffer = JSON.parse(bookingDetails.rawOffer);
            localStorage.removeItem('bookingType')
            localStorage.removeItem('bookingDetails')

            if (bookingType === 'Air') {
                const makeReturnDate = new Date(bookingDetails.itineraries[0]?.segments[0]?.departure?.dateTime);
                makeReturnDate.setDate(makeReturnDate.getDate() + 1);
                enqueueSnackbar('Flight Booking in Progress.', { variant: 'info' })
                let bookingDetail = {
                    origin: bookingDetails.from.value,
                    destination: bookingDetails.to.value,
                    departureDate: bookingDetails.itineraries[0]?.segments[0]?.departure?.dateTime,
                    adults: parseInt(bookingDetails.adult),
                    children: parseInt(bookingDetails.children),
                    infants: parseInt(bookingDetails.infant),
                    returnDate : makeReturnDate
                }
                if(bookingDetails.itineraries[1]?.segments[0]?.departure?.dateTime){
                    bookingDetail.returnDate =  bookingDetails.itineraries[1]?.segments[0]?.departure?.dateTime
                }else{
                    getRawOffer.oneWay = true
                }
              let finalRawOffer =   JSON.stringify(getRawOffer)
                bookFlight({
                    bookingDetail,
                    selectedOffer: finalRawOffer
                })
                    .then(res => {
                        // console.log(res.data)
                        enqueueSnackbar('New Booking Created.', { variant: 'success' })
                        setReload(prev => prev + 1)
                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            history.push('/401')
                        } else {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            enqueueSnackbar(error.response.data.error.error, { variant: 'error' })
                        }
                    })
            } else if (bookingType === 'Hotel') {
                enqueueSnackbar('Hotel Booking in Progress.', { variant: 'info' })
                bookHotel(bookingDetails)
                    .then(res => {
                        // console.log(res.data)
                        enqueueSnackbar('New Booking Created.', { variant: 'success' })
                        setReload(prev => prev + 1)
                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            history.push('/401')
                        } else {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            enqueueSnackbar(error.response.data.error.error, { variant: 'error' })
                        }
                    })
            } else if (bookingType === 'Package') {
                enqueueSnackbar('Travel Package Booking in Progress.', { variant: 'info' })
                bookPackage(bookingDetails)
                    .then(res => {
                        // console.log(res.data)
                        enqueueSnackbar('Success, New Booking Created.', { variant: 'success' })
                        setReload(prev => prev + 1)
                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            history.push('/401')
                        } else {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            enqueueSnackbar(error.response.data.error.error, { variant: 'error' })
                        }
                    })
            }
        }
    }, [])

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [reload, render])

    return (
        <>
            <Collapse in={render === 'new'}>
                <NewBooking setReload={setReload} setRender={setRender} />
            </Collapse>
            {render != 'new' && render != 'all' ?
                <Collapse in={render != 'new' && render != 'all'}>
                    <EditBooking setReload={setReload} id={render} type={type} setRender={setRender} />
                </Collapse> : null}
            <Collapse in={render === 'all'}>
                <ListAllBookings reload={reload} setType={setType} setReload={setReload} setRender={setRender} />
            </Collapse>
        </>
    )
}

export default Bookings;