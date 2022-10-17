import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ListAllCustomers from './components/ListAllCustomers'
import ViewCustomer from './components/ViewCustomer'

function Customers() {
    const [render, setRender] = useState('all')
    const [reload, setReload] = useState(1)

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [reload, render])

    return (
        <>
            {render != 'all' ?
                <Collapse in={render != 'all'}>
                    <ViewCustomer setReload={setReload} id={render} setRender={setRender} />
                </Collapse> : null}
            <Collapse in={render === 'all'}>
                <ListAllCustomers reload={reload} setReload={setReload} setRender={setRender} />
            </Collapse>
        </>
    )
}

export default Customers;