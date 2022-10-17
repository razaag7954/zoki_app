/* eslint-disable */

import React from 'react';
import SearchHotels from './searchHotels';

function ListAvailableHotelOffers({ setHotelRender }) {

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <SearchHotels setHotelRender={setHotelRender} />
        </>
    );
};
export default ListAvailableHotelOffers;