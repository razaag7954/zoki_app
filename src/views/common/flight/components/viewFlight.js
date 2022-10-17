import React, { useState, useEffect } from "react";
// core components
import Button from "components/CustomButtons/Button.js";
import SignUpModel from './signupModel'

export default function ViewFlight({ data, setFlightRender }) {
    const [signup, setSignup] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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

    const bookFlightHandler = (e) => {
        e.preventDefault();
        setSignup(true)
    }

    return (
        <form className="container mt-4" onSubmit={bookFlightHandler}>
            <div>
                <div className="d-flex mb-2 justify-content-between align-items-end">
                    <div>
                        {/* <p className='m-0' style={{ fontWeight: 'bold' }}>{Duration: 10 h 29 m}</p> */}
                        <p className='m-0' style={{ fontWeight: 'bold' }}>{`From: ${data?.from?.label} (${data?.from?.value})`}</p>
                        <p className='m-0' style={{ fontWeight: 'bold' }}>{`To: ${data?.to?.label} (${data?.to?.value})`}</p>
                        <p className='m-0' style={{ fontWeight: 'bold' }}>{`Type: ${data?.itineraries?.length === 2 ? "Return" : "One Way"}`}</p>
                        {checkIndirect(data?.itineraries) && <p className='m-0' style={{ fontWeight: 'bold' }}>{`Via: ${checkIndirect(data?.itineraries)}`}</p>}
                    </div>
                    <div>
                        {/* <p className='m-0' style={{ fontWeight: 'bold' }}>Class: Economy</p> */}
                        <p className='m-0' style={{ fontWeight: 'bold' }}>{`Passenger: ${parseInt(data?.adult) + parseInt(data?.children) + parseInt(data?.infant)}`}</p>
                        <p className='m-0' style={{ fontWeight: 'bold' }}>{`Price: $${data?.price?.grandTotal}`}</p>
                    </div>
                </div>
                <table className="w-100 text-center" style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                    {
                        data?.itineraries?.map((iti, index) => {
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
                    <Button style={{ width: '32%' }} round onClick={() => setFlightRender('all')}>
                        Go Back
                    </Button>
                    <Button style={{ width: '32%' }} type='submit' color="success" round>
                        Book Now
                    </Button>
                </div>
            </div>
            <SignUpModel bookingDetails={data} signup={signup} setSignup={setSignup} />
        </form>
    );
}
