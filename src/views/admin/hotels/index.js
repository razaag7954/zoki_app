import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ListAllHotels from './components/ListAllHotels'
import NewHotel from './components/AddHotel'
import EditHotel from './components/EditHotel'

function Hotels() {
    const [render, setRender] = useState('all')
    const [reload, setReload] = useState(1)

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [reload, render])

    return (
        <>
            <Collapse in={render === 'new'}>
                <NewHotel setReload={setReload} setRender={setRender} />
            </Collapse>
            {render != 'new' && render != 'all' ?
                <Collapse in={render != 'new' && render != 'all'}>
                    <EditHotel setReload={setReload} id={render} setRender={setRender} />
                </Collapse> : null}
            <Collapse in={render === 'all'}>
                <ListAllHotels reload={reload} setReload={setReload} setRender={setRender} />
            </Collapse>
        </>
    )
}

export default Hotels;