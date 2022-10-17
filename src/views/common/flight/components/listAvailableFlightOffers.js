/* eslint-disable */

import React from 'react';
import SearchFlights from './searchFlights';

function ListAvailableFlightOffers({ setFlightRender }) {

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <SearchFlights setFlightRender={setFlightRender} />
        </>
    );
};
export default ListAvailableFlightOffers;