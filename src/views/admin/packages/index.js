import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ListAllPackages from './components/ListAllPackages'
import NewPackage from './components/AddPackage'
import EditPackage from './components/EditPackage'

function Packages() {
    const [render, setRender] = useState('all')
    const [reload, setReload] = useState(1)

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [reload, render])

    return (
        <>
            <Collapse in={render === 'new'}>
                <NewPackage setReload={setReload} setRender={setRender} />
            </Collapse>
            {render != 'new' && render != 'all' ?
                <Collapse in={render != 'new' && render != 'all'}>
                    <EditPackage setReload={setReload} id={render} setRender={setRender} />
                </Collapse> : null}
            <Collapse in={render === 'all'}>
                <ListAllPackages reload={reload} setReload={setReload} setRender={setRender} />
            </Collapse>
        </>
    )
}

export default Packages;