import { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ListPackages from './components/listAvailablePackageOffers'
import ViewPackage from './components/viewPackage'
import TopNavBar from 'views/landingPage/components/topNavBar';
import Header from './components/header';
import Footer from 'views/landingPage/components/footer';

function PackageOffers() {
    const [packageRender, setPackageRender] = useState('all')
    return (
        <>
            <TopNavBar />
            <Header text={packageRender !== 'all' ? "Package Details" : "Search Travel Packages"} />
            {packageRender != 'all' ?
                <Collapse in={packageRender != 'all'}>
                    <ViewPackage data={packageRender} setPackageRender={setPackageRender} />
                </Collapse> : null}
            <Collapse in={packageRender === 'all'}>
                <ListPackages setPackageRender={setPackageRender} />
            </Collapse>
            <Footer />
        </>
    );
};
export default PackageOffers;