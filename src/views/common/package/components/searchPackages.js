import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { getAvailablePackages } from 'crud'
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import PackageCard from './packageCard'

function PackagesSearchResults({ setPackageRender }) {
    const history = useHistory();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [adult, setAdult] = useState('');
    const [children, setChildren] = useState('');
    const [infant, setInfant] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);

    const msg = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0)
        searchHandler()
    }, [])

    const searchHandler = (e) => {
        if (e)
            e.preventDefault();
        msg.current.innerText = ''
        setLoading(true)
        let params = {
            search: { query: search },
            sort: "name",
            page,
            pageSize: 10
            // checkin: checkIn,
            // checkout: checkOut,
            // adults: adult,
            // children: children,
            // infants: infant
        }
        getAvailablePackages(params)
            .then(res => {
                console.log(res.data.data)
                setOffers(res.data.data.travelPackages)
                setPage(res.data.data.currentPage)
                setTotalPages(res.data.data.totalPages)
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

    const handlePageChange = (event, value) => {
        setPage(value);
        searchHandler();
    };

    return (
        <>
            <form className='container mt-4' onSubmit={searchHandler}>
                <div className='row mt-3 mb-1' style={{ fontSize: 12 }}>
                    <div className="col-lg-12 px-1">
                        <div className='w-100'>
                            <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} className='tab-input form-control p-2 shadow-right text-secondary w-100' placeholder='Search Here' />
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
                            {/* <div className='container text-center'>
                                <h3>{`Search result for "${search}"`}</h3>
                                <h5>{`${offers.length} record(s) found`}</h5>
                            </div> */}
                            <div className='container pt-3'>
                                {
                                    offers.map((o, i) => {
                                        return (
                                            <PackageCard setPackageRender={setPackageRender} data={o} key={i} />
                                        )
                                    })
                                }
                            </div>
                            <div className='d-flex w-100 justify-content-center'>
                                <Pagination color="secondary" count={totalPages} page={page} onChange={handlePageChange} />
                            </div>
                        </>
                    ) : (
                        <h4 className='my-4 ml-auto mr-auto'>No Record Found</h4>
                    )
                }
                <h4 ref={msg} className='my-4 ml-auto mr-auto'></h4>
            </div>
        </>
    )
}

export default PackagesSearchResults;