/* eslint-disable */

import React from 'react';
import SearchFlights from './searchFlights';

function ListAvailableFlightOffers({ setFlightRender, setNewRender }) {

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <h3 className='text-center'>Search Flights</h3>
            <SearchFlights setFlightRender={setFlightRender} setNewRender={setNewRender} />
        </>
    );
};
export default ListAvailableFlightOffers;