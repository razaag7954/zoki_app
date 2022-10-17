/* eslint-disable */

import React from 'react';
import SearchPackages from './searchPackages';

function ListAvailablePackagesOffers({ setPackageRender }) {

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <SearchPackages setPackageRender={setPackageRender} />
        </>
    );
};
export default ListAvailablePackagesOffers;