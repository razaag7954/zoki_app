import Chip from '@material-ui/core/Chip';
import Clock from './img/main_page_icons/clock.svg';
import Person from './img/main_page_icons/person.svg';
import MapPin from './img/main_page_icons/map-pin.svg';
import Package1 from './img/main_page/package 1.png';

function PackageCard({ data }) {
    console.log(data);
    return (
        <>
            <div className="col-lg-4 col-md-6 col-sm-12 card-super-container">
                <div className="card-container">
                    <div className="card-image-wrapper">
                        <div>
                            <div className="card-image-background">
                                <img alt='package 1' src={data.featuredImg} style={{ borderRadius: '6px'}} className='w-100 ' />
                            </div>
                        </div>
                    </div>
                    <div className="card-details-container">
                        <span className="text-bold details-container-header">{data.name}</span>
                        <div>
                            <div className="card-details-text">
                                <div>
                                    {data.description}
                                </div>
                                <div >
                                    <h6 className='card-price'>{`Price: ${data.price} USD`}</h6>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        <ol className="card-final-desc">
                            <lil className="card-final-desc-item">
                                <span className="card-dot"></span>
                                <img alt='clock' src={Clock} className='mr-1' />
                                {` ${data.days}D / ${data.nights}N `}
                            </lil>
                            <lil className="card-final-desc-item">
                                <span className="card-dot"></span>
                                <img alt='clock' src={Person} className='mr-1' />
                                {` ${data.noOfPersons} Person `}
                            </lil>
                            <lil className="card-final-desc-item">
                                <span className="card-dot"></span>
                                <img alt='clock' src={MapPin} className='mr-1' />
                                {` ${data.destination} `}
                            </lil>
                        </ol>
                    </div>
                    <div className="card-btn-container">
                        <button className="btn  zoki-btn">Book Now </button>
                    </div>
                </div>
            </div>

            {/*<div className='col-lg-4 mb-4'>*/}
            {/*    <img alt='package 1' src={data.featuredImg} style={{ height: 250 }} className='w-100' />*/}
            {/*    <div className='bg-white py-4 px-4 shadow-lg' style={{ fontSize: 14, textAlign: 'start' }}>*/}
            {/*        <h6>{data.name}</h6>*/}
            {/*        <p>{data.description}</p>*/}
            {/*        <div className='d-flex justify-content-between w-100'>*/}
            {/*            <h6 className='m-0'>{`Price: ${data.price} USD`}</h6>*/}
            {/*            <h6 className='m-0' style={{ color: '#9C8E35', cursor: 'pointer' }}>Book Now</h6>*/}
            {/*        </div>*/}
            {/*        /!* <div className='mt-3'>*/}
            {/*        {data.activities.map((act, i) => {*/}
            {/*            return (*/}
            {/*                <Chip className='mr-2 px-3' key={i} label={act} />*/}
            {/*            )*/}
            {/*        })}*/}
            {/*    </div> *!/*/}
            {/*    </div>*/}
            {/*    <div className='row shadow mx-3' style={{ backgroundColor: '#9C8E35', fontSize: 12 }}>*/}
            {/*        <div className='col-4 p-0 text-center'>*/}
            {/*            <div className='py-2 text-white d-flex w-100 justify-content-center' style={{ borderRight: '1px solid white' }}>*/}
            {/*                <img alt='clock' src={Clock} className='mr-1' />*/}
            {/*                <p className='mb-0'>{` ${data.days} D / ${data.nights} N `}</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className='col-4 p-0'>*/}
            {/*            <div className='py-2 text-white d-flex w-100 justify-content-center' style={{ borderRight: '1px solid white' }}>*/}
            {/*                <img alt='clock' src={Person} className='mr-1' />*/}
            {/*                <p className='mb-0'>{` ${data.noOfPersons} Person `}</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className='col-4 p-0'>*/}
            {/*            <div className='py-2 text-white d-flex w-100 justify-content-center'>*/}
            {/*                <img alt='clock' src={MapPin} className='mr-1' />*/}
            {/*                <p className='mb-0'>{` ${data.destination} `}</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>

    )
}

export default PackageCard;