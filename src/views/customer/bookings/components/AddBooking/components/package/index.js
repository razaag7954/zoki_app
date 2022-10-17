import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ListPackages from './components/listAvailablePackageOffers'
import ViewPackage from './components/viewPackage'

function PackageOffers({ setReload, setRender, setNewRender }) {
    const [packageRender, setPackageRender] = useState('all')

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])

    return (
        <>
            {packageRender != 'all' ?
                <Collapse in={packageRender != 'all'}>
                    <ViewPackage setReload={setReload} setNewRender={setNewRender} setRender={setRender} data={packageRender} setPackageRender={setPackageRender} />
                </Collapse> : null}
            <Collapse in={packageRender === 'all'}>
                <ListPackages setNewRender={setNewRender} setPackageRender={setPackageRender} />
            </Collapse>
        </>
    );
};
export default PackageOffers;