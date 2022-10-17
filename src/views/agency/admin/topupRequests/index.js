import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ListAllRequests from './components/ListAllRequests'
import EditRequest from './components/EditRequest'

function TopupRequests() {
    const [render, setRender] = useState('all')
    const [reload, setReload] = useState(1)

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [reload, render])

    return (
        <>
            {render != 'all' ?
                <Collapse in={render != 'all'}>
                    <EditRequest setReload={setReload} id={render} setRender={setRender} />
                </Collapse> : null}
            <Collapse in={render === 'all'}>
                <ListAllRequests reload={reload} setReload={setReload} setRender={setRender} />
            </Collapse>
        </>
    )
}

export default TopupRequests;