import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { unsetToken, unsetUser } from 'redux/actions';

function Unauthorized() {
    const history = useHistory();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(unsetToken())
        dispatch(unsetUser())
        history.push('/login')
    }

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100vw', backgroundColor: '#F1F2F3' }}>
            <div className='d-flex flex-column justify-content-center align-items-center p-4' style={{ height: '50%', width: '30%', backgroundColor: 'white', boxShadow: '1px 1px 10px gray' }}>
                <h2>Unauthorized Access</h2>
                <h5>Please Login to continue.</h5>
                <button className='btn btn-primary mt-4' onClick={logoutHandler}>Go to Login Page</button>
            </div>
        </div>
    )
}

export default Unauthorized;