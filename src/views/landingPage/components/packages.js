import { useState, useEffect } from 'react'
import { getAvailablePackages } from 'crud'
import PackageBg from '../../../assets/img/offers.jpg';
import Card from './packageCard'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

function Packages() {
    const history = useHistory();
    const [listPackages, setListPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const params = {
            search: { query: "" },
            sort: "name",
            page: 1,
            pageSize: 3
        }
        setLoading(true)
        getAvailablePackages(params)
            .then(res => {
                // console.log(res.data.data)
                setListPackages(res.data.data.travelPackages)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.response.data);
                console.log(error.response.status);
                setLoading(false)
            })
    }, [])
    let checkData = [
        {
            name: "ahmad",
            description: "this is description",
            price: 5,
            days: 5,
            nights: 9,
            noOfPersons: 9,
            destination: "England",
            featuredImg:
        "https://media.gettyimages.com/photos/castle-combe-in-the-fall-wiltshire-england-picture-id157006201?s=612x612"
        },
        {
            name: "ali",
            description: "this is description",
            price: 5,
            days: 5,
            nights: 9,
            noOfPersons: 9,
            destination: "homeland",
            featuredImg:
           "data:image/jpeg;base64,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"
        },
        {
            name: "ali",
            description: "this is description",
            price: 5,
            days: 5,
            nights: 9,
            noOfPersons: 9,
            destination: "finland",
            featuredImg:
            "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlubGFuZHxlbnwwfHwwfHw%3D&w=1000&q=80"
        }
    ]

    return (
        <div id="zoki-packages" className='text-center py-5 my-5' style={{ backgroundImage: `url(${PackageBg})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <div className='container' style={{ color: '#344767' }}>
                <h6 className="text-bold font-italic"> EXPLORE GREAT PLACES </h6>
                <h1 className=""> Popular Packages </h1>
                <div className='row justify-content-center align-content-center'>
                    {
                        checkData.map((pkg) => {
                            return (
                                <Card data={pkg} key={pkg._id} />
                            )
                        })
                    }

                    {/*{*/}
                    {/*    loading ? (*/}
                    {/*        <CircularProgress className='my-4 ml-auto mr-auto' />*/}
                    {/*    ) : listPackages.length ? (*/}
                    {/*        listPackages.map((pkg) => {*/}
                    {/*            return (*/}
                    {/*                <Card data={pkg} key={pkg._id} />*/}
                    {/*            )*/}
                    {/*        })*/}
                    {/*    ) : (*/}
                    {/*        <h4 className='my-4 ml-auto mr-auto'>No Package Available at that time.</h4>*/}
                    {/*    )*/}
                    {/*}*/}
                </div>
                {listPackages.length ? <button onClick={() => history.push('/search-packages')} className='btn btn-dark px-4 p-2 rounded-pill my-4' style={{ color: '#CFBD45', backgroundColor: 'black', fontSize: 14 }}>
                    <p className='mb-0'> VEIW ALL PACKAGES </p>
                </button> : null}
            </div>
        </div>
    )
}

export default Packages;