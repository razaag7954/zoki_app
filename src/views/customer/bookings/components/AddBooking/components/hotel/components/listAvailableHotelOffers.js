/* eslint-disable */

import React from 'react';
import SearchHotels from './searchHotels';

function ListAvailableHotelOffers({ setHotelRender, setNewRender }) {

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <h3 className='text-center'>Search Hotels</h3>
            <SearchHotels setHotelRender={setHotelRender} setNewRender={setNewRender} />
        </>
    );
};
export default ListAvailableHotelOffers;