import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBooking } from 'crud'
// @material-ui/core components
import { useSnackbar } from 'notistack';
import { setLoading, unsetLoading } from "redux/actions";
// core components
import Button from "components/CustomButtons/Button.js";

export default function EditFlight({ setReload, setRender, data }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const checkIndirect = (itineraries) => {
        if (!itineraries) {
            return ''
        }
        let via = ''
        for (const iti of itineraries) {
            if (iti.segments.length === 2) {
                via = iti.segments[0]?.arrival?.airport
                break;
            }
        }
        return via
    }

    const deleteFlightHandler = () => {
        dispatch(setLoading())
        deleteBooking(data._id)
            .then(res => {
                // console.log(res.data)
                enqueueSnackbar('Success, Booking Deleted.', { variant: 'success' })
                dispatch(unsetLoading())
                setRender('all')
                setReload(prev => prev + 1)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    history.push('/401')
                } else {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    enqueueSnackbar('Unable to delete this booking.', { variant: 'error' })
                }
                dispatch(unsetLoading())
            })
    }

    return (
        <>
            <div>
                <h3 className='text-center mb-4'>Booking Details</h3>
                <div className="d-flex mb-2 justify-content-between align-items-end">
                    <div>
                        {/* <p className='m-0' style={{ fontWeight: 'bold' }}>{Duration: 10 h 29 m}</p> */}
                        <p className='m-0' style={{ fontWeight: 'bold' }}>{`From: ${data?.bookingDetail?.origin}`}</p>
                        <p className='m-0' style={{ fontWeight: 'bold' }}>{`To: ${data?.bookingDetail?.destination}`}</p>
                        <p className='m-0' style={{ fontWeight: 'bold' }}>{`Type: ${data?.selectedOffer?.itineraries?.length === 2 ? "Return" : "One Way"}`}</p>
                        {checkIndirect(data?.selectedOffer?.itineraries) && <p className='m-0' style={{ fontWeight: 'bold' }}>{`Via: ${checkIndirect(data?.selectedOffer?.itineraries)}`}</p>}
                    </div>
                    <div>
                        {/* <p className='m-0' style={{ fontWeight: 'bold' }}>Class: Economy</p> */}
                        <p className='m-0' style={{ fontWeight: 'bold' }}>{`Passenger: ${parseInt(data?.bookingDetail?.adults) + parseInt(data?.bookingDetail?.children) + parseInt(data?.bookingDetail?.infants)}`}</p>
                        <p className='m-0' style={{ fontWeight: 'bold' }}>{`Price: $${data?.selectedOffer?.price?.total}`}</p>
                    </div>
                </div>
                <table className="w-100 text-center" style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                    {
                        data?.selectedOffer?.itineraries?.map((iti, index) => {
                            return <tbody key={index}>
                                {
                                    iti?.segments?.map((seg, i) => {
                                        return <React.Fragment key={i}>
                                            <tr>
                                                <th colSpan={7} className="p-1 text-center" style={{ border: '1px solid black', borderCollapse: 'collapse' }}>{`${i + 1}. ${seg?.departure?.airport} - ${seg?.arrival?.airport}`}</th>
                                            </tr>
                                            <tr>
                                                <th className="p-1 text-center" style={{ width: '20%', border: '1px solid black', borderCollapse: 'collapse' }}>Carrier Code</th>
                                                <th className="p-1 text-center" style={{ width: '20%', border: '1px solid black', borderCollapse: 'collapse' }}>Flight No.</th>
                                                <th className="p-1 text-center" style={{ width: '20%', border: '1px solid black', borderCollapse: 'collapse' }}>Depature</th>
                                                <th className="p-1 text-center" style={{ width: '20%', border: '1px solid black', borderCollapse: 'collapse' }}>Arrival</th>
                                                <th className="p-1 text-center" style={{ width: '20%', border: '1px solid black', borderCollapse: 'collapse' }}>Duration</th>
                                            </tr>
                                            <tr>
                                                <td style={{ border: '1px solid black', borderCollapse: 'collapse' }}>{`${seg?.carrierCode}`}</td>
                                                <td style={{ border: '1px solid black', borderCollapse: 'collapse' }}>{`${seg?.flight}`}</td>
                                                <td style={{ border: '1px solid black', borderCollapse: 'collapse' }}>{`${new Date(seg?.departure?.dateTime)}`}</td>
                                                <td style={{ border: '1px solid black', borderCollapse: 'collapse' }}>{`${new Date(seg?.arrival?.dateTime)}`}</td>
                                                <td style={{ border: '1px solid black', borderCollapse: 'collapse' }}>{`${seg?.duration}`}</td>
                                            </tr>
                                        </React.Fragment>
                                    })
                                }
                            </tbody>
                        })
                    }
                </table>
                <div className="d-flex mt-3 w-100 justify-content-around">
                    <Button style={{ width: '32%' }} round onClick={() => setRender('all')}>
                        Go Back
                    </Button>
                    <Button style={{ width: '32%' }} type='button' onClick={deleteFlightHandler} color="danger" round>
                        Delete
                    </Button>
                </div>
            </div>
        </>
    );
}
