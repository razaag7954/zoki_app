/* eslint-disable */

import React from 'react';
import SearchPackages from './searchPackages';

function ListAvailablePackagesOffers({ setPackageRender, setNewRender }) {

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <h3 className='text-center'>Search Travel Packages</h3>
            <SearchPackages setPackageRender={setPackageRender} setNewRender={setNewRender} />
        </>
    );
};
export default ListAvailablePackagesOffers;