function FlightCard({ from, to, adult, children, infant, data, setFlightRender }) {

    const checkIndirect = (itineraries) => {
        let via = ''
        for (const iti of itineraries) {
            if (iti.segments.length === 2) {
                via = iti.segments[0]?.arrival?.airport
                break;
            }
        }
        return via
    }

    return (
        <div className='col-lg-12'>
            <div className='my-3'>
                <div className='row border bg-white shadow p-2' style={{ minHeight: 200 }}>
                    <div className='col-3 p-3 d-flex justify-content-center align-item-center'>
                        <img alt='london' style={{ objectFit: 'contain' }} src='https://cdn1.iconfinder.com/data/icons/fly-airbus-and-aeroplane/154/fly-air-plane-airbus-aeroplane-512.png' className='w-100' />
                    </div>
                    <div className='col-6 d-flex flex-column justify-content-center'>
                        <h5>{`${from.label} (${from.value}) - ${to.label} (${to.value})`}</h5>
                        <p className='my-1'>{`Ticket Type: ${data.itineraries.length === 2 ? "Return" : "One Way"}`}</p>
                        <p className='my-1'>{`Departure: ${new Date(data.itineraries[0]?.segments[0]?.departure?.dateTime)}`}</p>
                        {data.itineraries.length === 2 && <p className='my-1'>{`Return: ${new Date(data.itineraries[1]?.segments[0]?.departure?.dateTime)}`}</p>}
                        <div className="d-flex my-1">
                            <p className='mb-0 mr-3'>{`Available Seat: ${data.numberOfBookableSeats}`}</p>
                            <p className='mb-0 mr-3'>{`Price: $${data.price.grandTotal}`}</p>
                            {checkIndirect(data.itineraries) && <p className='mb-0'>{`Via: ${checkIndirect(data.itineraries)}`}</p>}
                            {/* <p className='mb-0 mr-3'>Class: Economy</p> */}
                        </div>
                    </div>
                    <div className='col-3 d-flex flex-column justify-content-center'>
                        <button onClick={() => setFlightRender({ ...data, from, to, adult, children, infant })} className='btn btn-primary rounded-pill px-4 border-0' style={{ backgroundColor: '#B6A63C', color: 'black' }}>
                            <p className='mb-0'>View Details</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlightCard;