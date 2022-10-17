import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import Menu from './components/menu'
import FlightOffers from './components/flight'
import HotelOffers from './components/hotel'
// import CarOffers from './components/flight'
import PackageOffers from './components/package'

function AddNewBooking({ setReload, setRender }) {
  const [newRender, setNewRender] = useState('menu')

  return (
    <>
      <Collapse in={newRender === 'flight'}>
        <FlightOffers setReload={setReload} setRender={setRender} setNewRender={setNewRender} />
      </Collapse>
      <Collapse in={newRender === 'hotel'}>
        <HotelOffers setReload={setReload} setRender={setRender} setNewRender={setNewRender} />
      </Collapse>
      {/* <Collapse in={newRender === 'car'}>
        <CarOffers setReload={setReload} setRender={setRender} setNewRender={setNewRender} />
      </Collapse> */}
      <Collapse in={newRender === 'package'}>
        <PackageOffers setReload={setReload} setRender={setRender} setNewRender={setNewRender} />
      </Collapse>
      <Collapse in={newRender === 'menu' || newRender === 'car'}>
        <Menu setRender={setRender} setNewRender={setNewRender} />
      </Collapse>
    </>
  )
}

export default AddNewBooking;