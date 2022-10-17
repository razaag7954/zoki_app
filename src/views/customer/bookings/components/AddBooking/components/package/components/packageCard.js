function PackageCard({ data, setPackageRender }) {
    return (
        <div className='col-lg-12'>
            <div className='my-3'>
                <div className='row border bg-white shadow' style={{ minHeight: 200 }}>
                    <div className='col-3 p-3 d-flex justify-content-center align-item-center'>
                        <img alt={data.name} style={{ objectFit: 'contain' }} src={data.featuredImg} className='w-100' />
                    </div>
                    <div className='col-6 d-flex flex-column justify-content-center'>
                        <h4>{data.name}</h4>
                        <p className='my-1'>{`${data.description}`}</p>
                        <div className="d-flex my-1">
                            <p className='mb-0 mr-3'>{`Duration: ${data.days}D / ${data.nights}N`}</p>
                            <p className='mb-0 mr-3'>{`Person: ${data.noOfPersons}`}</p>
                            <p className='mb-0'>{`Price: ${data.price}$`}</p>
                        </div>
                    </div>
                    <div className='col-3 d-flex flex-column justify-content-center'>
                        <button onClick={() => setPackageRender(data)} className='btn btn-primary rounded-pill px-4 border-0' style={{ backgroundColor: '#B6A63C', color: 'black' }}>
                            <p className='mb-0'>View</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageCard;