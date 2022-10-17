import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ListHotels from './components/listAvailableHotelOffers'
import ViewHotel from './components/viewHotel'

function HotelOffers({ setReload, setRender, setNewRender }) {
    const [hotelRender, setHotelRender] = useState('all')

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])

    return (
        <>
            {hotelRender != 'all' ?
                <Collapse in={hotelRender != 'all'}>
                    <ViewHotel setReload={setReload} setNewRender={setNewRender} setRender={setRender} data={hotelRender} setHotelRender={setHotelRender} />
                </Collapse> : null}
            <Collapse in={hotelRender === 'all'}>
                <ListHotels setNewRender={setNewRender} setHotelRender={setHotelRender} />
            </Collapse>
        </>
    );
};
export default HotelOffers;