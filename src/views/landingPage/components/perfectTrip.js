import Lahore from './img/main_page/Lahore.png';
import Karachi from './img/main_page/Karachi.png';
import London from '../../../assets/img/pexels-dominika-gregušová-672532.jpg';
import Istanbol from '../../../assets/img/istanbul.jpg';
import milan from '../../../assets/img/milan.jpg';

import NewYork from './img/main_page/New York.png';
import Plane from './img/main_page_icons/plane.svg';
import Car from './img/main_page_icons/car.svg';
import Hotel from './img/main_page_icons/hotel.svg';
import TripBg from './img/main_page/trip.png'

function PerfectTrip() {
    return (
        <div className='my-5' style={{ backgroundImage: `url(${TripBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='container' style={{ color: '#344767' }}>
                <div>
                    <h2 className='my-3 text-bold trip-heading'>
                        Plan Your Perfect Trip
                    </h2>
                    <h3 className="trip-sub-heading"> Search Flights Hotels & Car Hire To Our Most Pupolar Destinations </h3>
                </div>
                <div className='row justify-content-center align-content-center'>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <div className="trip-card-container">
                            <div className="trip-card-imag-wrapper">
                                <img alt='london' src={London} width={'100px'} height={'100px'} />
                            </div>
                            <div className="trip-card-content">
                                <h4 className="text-bold trip-card-content-heading">Jeddah</h4>
                                <div>
                                    <ul className="trip-card-links">
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Flights</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Hotel</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Car Hire</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <div className="trip-card-container">
                            <div className="trip-card-imag-wrapper">
                                <img alt='london' src={Lahore} width={'100px'} height={'100px'} />
                            </div>
                            <div className="trip-card-content">
                                <h4 className="text-bold trip-card-content-heading">Lahore</h4>
                                <div>
                                    <ul className="trip-card-links">
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Flights</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Hotel</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Car Hire</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <div className="trip-card-container">
                            <div className="trip-card-imag-wrapper">
                                <img alt='london' src={Karachi} width={'100px'} height={'100px'} />
                            </div>
                            <div className="trip-card-content">
                                <h4 className="text-bold trip-card-content-heading">Karachi</h4>
                                <div>
                                    <ul className="trip-card-links">
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Flights</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Hotel</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Car Hire</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <div className="trip-card-container">
                            <div className="trip-card-imag-wrapper">
                                <img alt='london' src={NewYork} width={'100px'} height={'100px'} />
                            </div>
                            <div className="trip-card-content">
                                <h4 className="text-bold trip-card-content-heading">NewYork</h4>
                                <div>
                                    <ul className="trip-card-links">
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Flights</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Hotel</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Car Hire</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <div className="trip-card-container">
                            <div className="trip-card-imag-wrapper">
                                <img alt='london' src={Istanbol} width={'100px'} height={'100px'} />
                            </div>
                            <div className="trip-card-content">
                                <h4 className="text-bold trip-card-content-heading">Istanbol</h4>
                                <div>
                                    <ul className="trip-card-links">
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Flights</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Hotel</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Car Hire</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <div className="trip-card-container">
                            <div className="trip-card-imag-wrapper">
                                <img alt='london' src={milan} width={'100px'} height={'100px'} />
                            </div>
                            <div className="trip-card-content">
                                <h4 className="text-bold trip-card-content-heading">Milan</h4>
                                <div>
                                    <ul className="trip-card-links">
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Flights</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Hotel</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Car Hire</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <div className="trip-card-container">
                            <div className="trip-card-imag-wrapper">
                                <img alt='london' src={London} width={'100px'} height={'100px'} />
                            </div>
                            <div className="trip-card-content">
                                <h4 className="text-bold trip-card-content-heading">Jeddah</h4>
                                <div>
                                    <ul className="trip-card-links">
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Flights</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Hotel</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Car Hire</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <div className="trip-card-container">
                            <div className="trip-card-imag-wrapper">
                                <img alt='london' src={London} width={'100px'} height={'100px'} />
                            </div>
                            <div className="trip-card-content">
                                <h4 className="text-bold trip-card-content-heading">Jeddah</h4>
                                <div>
                                    <ul className="trip-card-links">
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Flights</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Hotel</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Car Hire</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <div className="trip-card-container">
                            <div className="trip-card-imag-wrapper">
                                <img alt='london' src={London} width={'100px'} height={'100px'} />
                            </div>
                            <div className="trip-card-content">
                                <h4 className="text-bold trip-card-content-heading">Jeddah</h4>
                                <div>
                                    <ul className="trip-card-links">
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Flights</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Hotel</a>
                                        </li>
                                        <li className="trip-card-item">
                                            <a href="#" className="trip-card-links-a">Car Hire</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerfectTrip;