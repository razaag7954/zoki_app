import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ListAllUsers from './components/ListAllUsers'
import NewUser from './components/AddUser'
import EditUser from './components/EditUser'

function Users() {
    const [render, setRender] = useState('all')
    const [reload, setReload] = useState(1)

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [reload, render])

    return (
        <>
            <Collapse in={render === 'new'}>
                <NewUser setReload={setReload} setRender={setRender} />
            </Collapse>
            {render != 'new' && render != 'all' ?
                <Collapse in={render != 'new' && render != 'all'}>
                    <EditUser setReload={setReload} id={render} setRender={setRender} />
                </Collapse> : null}
            <Collapse in={render === 'all'}>
                <ListAllUsers reload={reload} setReload={setReload} setRender={setRender} />
            </Collapse>
        </>
    )
}

export default Users;