import { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getAllAirports, getAvailableFlights } from 'crud'
// import Pagination from '@material-ui/lab/Pagination';
import AsyncSelect from 'react-select/async';
import CircularProgress from '@material-ui/core/CircularProgress';
import FlightCard from './flightCard'

function FlightsSearchResults({ setFlightRender }) {
    const history = useHistory()
    const location = useLocation()
    const [type, setType] = useState('');
    const [from, setFrom] = useState('');
    const [inputFrom, setInputFrom] = useState('');
    const [to, setTo] = useState('');
    const [inputTo, setInputTo] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [adult, setAdult] = useState('');
    const [youth, setYouth] = useState('');
    const [children, setChildren] = useState('');
    const [infant, setInfant] = useState('');
    const [adultFromParams, setAdultFromParams] = useState(null);
    const [childrenFromParams, setChildrenFromParams] = useState(null);
    const [infantFromParams, setInfantFromParams] = useState(null);
    const [airline, setAirline] = useState('');
    const [travelClass, setTravelClass] = useState('');
    const [fareType, setFareType] = useState('');
    const [currency, setCurrency] = useState('');
    const [direct, setDirect] = useState(false);
    const [flexible, setFlexible] = useState('');
    const [offers, setOffers] = useState([]);
    const [offersFrom, setOffersFrom] = useState('');
    const [offersTo, setOffersTo] = useState('');
    // const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const msg = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (location?.state) {
            setLoading(true)
            getAvailableFlights(location.state.params)
                .then(res => {
                    // console.log(res.data.data.flightOffers)
                    setOffers(res.data.data.flightOffers)
                    setOffersFrom(location.state.from)
                    setOffersTo(location.state.to)
                    setAdultFromParams(location.state.params.adults)
                    setChildrenFromParams(location.state.params.children)
                    setInfantFromParams(location.state.params.infants)
                    setLoading(false)
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        history.push('/401')
                    } else {
                        console.log(error.response.data);
                        console.log(error.response.status);
                    }
                    setLoading(false)
                })
            history.replace({ pathname: location.pathname, state: null })
        }
    }, [])

    const handleAirportList = (inputValue) => {
        const params = {
            search: { query: inputValue },
            page: 1,
            pageSize: 10
        }
        return getAllAirports(params)
            .then(res => {
                // console.log(res.data.data.airports)
                let temp = []
                res.data.data.airports.forEach((a) => temp.push({ label: a.name, value: a.iataCode }))
                return temp
            })
            .catch(error => {
                if (error.response.status === 401) {
                    history.push('/401')
                } else {
                    console.log(error.response.data);
                    console.log(error.response.status);
                }
            })
    };

    // const handlePageChange = (event, value) => {
    //     setPage(value);
    // };

    const searchHandler = (e) => {
        e.preventDefault();
        msg.current.innerText = ''
        setLoading(true)
        let params = {
            origin: from?.value,
            destination: to?.value,
            departureDate,
            nonStop: direct,
            // travelClass: Joi.string().valid(...ALLOWED_AIR_TRAVEL_CLASSES),
            adults: adult,
            children: children,
            infants: infant
        }
        if (type === 'return') {
            params[`returnDate`] = returnDate
        }

        getAvailableFlights(params)
            .then(res => {
                console.log(res.data.data.flightOffers)
                setOffers(res.data.data.flightOffers)
                setOffersFrom(from)
                setOffersTo(to)
                setLoading(false)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    history.push('/401')
                } else {
                    console.log(error.response.data);
                    console.log(error.response.status);
                }
                msg.current.innerText = 'Error. Please try again.'
                setLoading(false)
            })
    }

    return (
        <>
            <form className='container mt-4' onSubmit={searchHandler}>
                <div className='row mt-3 mb-1' style={{ fontSize: 12 }}>
                    <div className='col-lg-4 px-1'>
                        <div className='w-100 position-relative' >
                            <p className='mb-1'> Departure </p>
                            <AsyncSelect
                                placeholder='Search Here'
                                cacheOptions
                                className='tab-input border-0 shadow-right text-secondary w-100'
                                // defaultOptions
                                value={from}
                                getOptionLabel={e => e.label}
                                getOptionValue={e => e.value}
                                onInputChange={(val) => setInputFrom(val)}
                                onChange={(val) => setFrom(val)}
                                loadOptions={handleAirportList}
                            />
                            <input
                                tabIndex={-1}
                                autoComplete="off"
                                className='position-absolute'
                                style={{ opacity: 0, height: 0 }}
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='col-lg-4 px-1'>
                        <div className='w-100 position-relative'>
                            <p className='mb-1'> Destination </p>
                            <AsyncSelect
                                placeholder='Search Here'
                                cacheOptions
                                className='tab-input border-0 shadow-right text-secondary w-100'
                                // defaultOptions
                                value={to}
                                getOptionLabel={e => e.label}
                                getOptionValue={e => e.value}
                                onInputChange={(val) => setInputTo(val)}
                                onChange={(val) => setTo(val)}
                                loadOptions={handleAirportList}
                            />
                            <input
                                tabIndex={-1}
                                autoComplete="off"
                                className='position-absolute'
                                style={{ opacity: 0, height: 0 }}
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-lg-2 px-1">
                        <div className='w-100'>
                            <p className='mb-1'> Departure Date </p>
                            <input type='date' min={new Date().toISOString().split('T')[0]} required value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} className='tab-input form-control p-2 shadow-right text-secondary w-100' placeholder='New York (Any)' />
                        </div>
                    </div>
                    <div className='col-lg-2 px-1'>
                        <div className='w-100'>
                            <p className='mb-1'> Return Date </p>
                            <input type='date' min={new Date().toISOString().split('T')[0]} required value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className='tab-input form-control p-2 shadow-right text-secondary w-100' placeholder='New York (Any)' />
                        </div>
                    </div>
                </div>
                <div className='row mt-3 mb-1' style={{ fontSize: 12 }}>
                    <div className='col-lg-4 px-1'>
                        <div className='w-100'>
                            <p className='mb-1'> Adult(15 + ) </p>
                            <select required value={adult} onChange={(e) => setAdult(e.target.value)} className='tab-input form-control p-2 shadow-right text-secondary w-100'>
                                <option value="" disabled hidden>No. of Adult(s)</option>
                                <option> 1 </option>
                                <option> 2 </option>
                                <option> 3 </option>
                                <option> 4 </option>
                                <option> 5 </option>
                                <option> 6 </option>
                                <option> 7 </option>
                                <option> 8 </option>
                                <option> 9 </option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-4 px-1'>
                        <div className='w-100'>
                            <p className='mb-1'> Children(2 - 11) </p>
                            <select required value={children} onChange={(e) => setChildren(e.target.value)} className='tab-input form-control p-2 shadow-right text-secondary w-100'>
                                <option value="" disabled hidden>No. of Children</option>
                                <option> 0 </option>
                                <option> 1 </option>
                                <option> 2 </option>
                                <option> 3 </option>
                                <option> 4 </option>
                                <option> 5 </option>
                                <option> 6 </option>
                                <option> 7 </option>
                                <option> 8 </option>
                                <option> 9 </option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-4 px-1'>
                        <div className='w-100'>
                            <p className='mb-1'> Infant(2 - ) </p>
                            <select required value={infant} onChange={(e) => setInfant(e.target.value)} className='tab-input form-control p-2 shadow-right text-secondary w-100'>
                                <option value="" disabled hidden>No. of Infant(s)</option>
                                <option> 0 </option>
                                <option> 1 </option>
                                <option> 2 </option>
                                <option> 3 </option>
                                <option> 4 </option>
                                <option> 5 </option>
                                <option> 6 </option>
                                <option> 7 </option>
                                <option> 8 </option>
                                <option> 9 </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row col-lg-9 mt-3 mb-1' style={{ fontSize: 16 }}>
                    <div className='col-lg-6'>
                        <div className='row'>
                            <p className='col-lg-4 p-0 mb-0'>
                                Ticket Type:
                            </p>
                            <div className='col-lg-4 p-0 mb-0'>
                                <p className='mb-0'>
                                    <input required onChange={(e) => setType(e.target.value)} type='radio' value="return" name="ticket-type" className='mr-2' />
                                    Return
                                </p>
                            </div>
                            <div className='col-lg-4 p-0 mb-0'>
                                <p className='mb-0'>
                                    <input required onChange={(e) => setType(e.target.value)} type='radio' value="one" name="ticket-type" className='mr-2' />
                                    One Way
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className='form-check'>
                            <input value={direct} onChange={(e) => setDirect(e.target.checked)} className='form-check-input' type='checkbox' id='flexCheckDefault' />
                            <label className='form-check-label'>
                                <p className=' p-0 mb-0' style={{ fontSize: 16, color: 'black' }}> Direct Flights Only </p>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='col-lg-12 px-1 my-3 text-center' >
                    <button type='button' onClick={() => history.push('/')} className='btn mr-2 w-25 rounded-pill px-4 border-0' style={{ backgroundColor: 'black', color: 'white' }}>
                        <p className='mb-0'>Go Back</p>
                    </button>
                    <button type='submit' className='btn btn-primary w-25 rounded-pill px-4 border-0' style={{ backgroundColor: '#B6A63C', color: 'black' }}>
                        <p className='mb-0'>Search</p>
                    </button>
                </div>
            </form >
            <hr className='my-4' />
            <div className='d-flex flex-column w-100'>
                {
                    loading ? (
                        <CircularProgress className='my-4 mr-auto ml-auto' />
                    ) : offers.length ? (
                        <>
                            <div className='container text-center'>
                                <h3>{`${offersFrom.label} (${offersFrom.value}) to ${offersTo.label} (${offersTo.value})`}</h3>
                                <h5>{`${offers.length} record(s) found`}</h5>
                            </div>
                            <div className='container pt-3'>
                                {
                                    offers.map((o, i) => {
                                        return (
                                            <FlightCard setFlightRender={setFlightRender} adult={adultFromParams !== null ? adultFromParams : adult} children={childrenFromParams !== null ? childrenFromParams : children} infant={infantFromParams !== null ? infantFromParams : infant} from={offersFrom} to={offersTo} data={o} key={i} />
                                        )
                                    })
                                }
                                {/* <Pagination color="secondary" count={10} page={page} onChange={handlePageChange} /> */}
                            </div>
                        </>
                    ) : (
                        null
                    )
                }
                <h4 ref={msg} className='my-4 ml-auto mr-auto'></h4>
            </div>
        </>
    )
}

export default FlightsSearchResults;