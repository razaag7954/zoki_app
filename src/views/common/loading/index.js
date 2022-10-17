import CircularProgress from '@material-ui/core/CircularProgress';

function Loading() {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '100vh', width: '100vw', backgroundColor: '#F1F2F3' }}>
            <CircularProgress />
            <h3 className='mt-4'>Please Wait.</h3>
        </div>
    )
}

export default Loading;