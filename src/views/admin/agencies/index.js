import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ListAllAgencies from './components/ListAllAgencies'
import EditAgency from './components/EditAgency'

function Agencies() {
    const [render, setRender] = useState('all')
    const [reload, setReload] = useState(1)

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [reload, render])

    return (
        <>
            {render != 'all' ?
                <Collapse in={render != 'all'}>
                    <EditAgency setReload={setReload} id={render} setRender={setRender} />
                </Collapse> : null}
            <Collapse in={render === 'all'}>
                <ListAllAgencies reload={reload} setReload={setReload} setRender={setRender} />
            </Collapse>
        </>
    )
}

export default Agencies;