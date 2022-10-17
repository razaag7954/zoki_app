import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ListAllVouchers from './components/ListAllVouchers'
import NewVoucher from './components/AddVoucher'
import EditVoucher from './components/EditVoucher'

function Vouchers() {
    const [render, setRender] = useState('all')
    const [reload, setReload] = useState(1)

    return (
        <>
            <Collapse in={render === 'new'}>
                <NewVoucher setReload={setReload} setRender={setRender} />
            </Collapse>
            {render != 'new' && render != 'all' ?
                <Collapse in={render != 'new' && render != 'all'}>
                    <EditVoucher setReload={setReload} id={render} setRender={setRender} />
                </Collapse> : null}
            <Collapse in={render === 'all'}>
                <ListAllVouchers reload={reload} setReload={setReload} setRender={setRender} />
            </Collapse>
        </>
    )
}

export default Vouchers;