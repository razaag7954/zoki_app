import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';

function Bookings() {
    const [render, setRender] = useState('all')
    const [reload, setReload] = useState(1)

    return (
        <>
            <Collapse in={render === 'all'}>
                Booking Module Under Construction.
            </Collapse>
        </>
    )
}

export default Bookings;