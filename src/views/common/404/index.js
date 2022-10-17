import { useHistory } from 'react-router-dom'

function NotFound() {
    const history = useHistory();
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100vw', backgroundColor: '#F1F2F3' }}>
            <div className='d-flex flex-column justify-content-center align-items-center p-4' style={{ height: '50%', width: '30%', backgroundColor: 'white', boxShadow: '1px 1px 10px gray' }}>
                <h2>404</h2>
                <h5>Page not Found.</h5>
                <button className='btn btn-primary mt-4' onClick={() => history.push('/')}>Go to Homepage</button>
            </div>
        </div>
    )
}

export default NotFound;