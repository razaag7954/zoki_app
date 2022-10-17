import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ListAllVouchers from './components/ListAllVouchers'
// import ViewVoucher from './components/ViewVoucher'

function Vouchers() {
    const [render, setRender] = useState('all')
    const [reload, setReload] = useState(1)

    return (
        <>
            {/* {render != 'all' ?
                <Collapse in={render != 'all'}>
                    <ViewVoucher setReload={setReload} id={render} setRender={setRender} />
                </Collapse> : null} */}
            {/* <Collapse in={render === 'all'}> */}
            <Collapse in={true}>
                <ListAllVouchers reload={reload} setReload={setReload} setRender={setRender} />
            </Collapse>
        </>
    )
}

export default Vouchers;