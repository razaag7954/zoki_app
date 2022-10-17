import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ListFlights from './components/listAvailableFlightOffers'
import ViewFlight from './components/viewFlight'

function FlightOffers({ setReload, setRender, setNewRender }) {
    const [flightRender, setFlightRender] = useState('all')

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])

    return (
        <>
            {flightRender != 'all' ?
                <Collapse in={flightRender != 'all'}>
                    <ViewFlight setReload={setReload} setNewRender={setNewRender} setRender={setRender} data={flightRender} setFlightRender={setFlightRender} />
                </Collapse> : null}
            <Collapse in={flightRender === 'all'}>
                <ListFlights setNewRender={setNewRender} setFlightRender={setFlightRender} />
            </Collapse>
        </>
    );
};
export default FlightOffers;
