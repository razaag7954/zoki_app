import { Link, NavLink, useHistory } from 'react-router-dom';

import Youtube from './img/main_page_icons/nav youtube.svg';
import Twitter from './img/main_page_icons/nav twitter.svg';
import Linkedin from './img/main_page_icons/nav linkedin.svg';
import Facebook from './img/main_page_icons/nav facebook.svg';
import Search from './img/main_page_icons/nav search.svg';
import Logo from "../../../assets/logo.png";

function TopNavBar() {
  const history = useHistory();
  return (
    <nav className='container-lg container-md container-sm responsive-container mt-0'>
      <div className='d-flex flex-row justify-content-between align-items-center mb-0'>
        <div>
          {/*<p className='m-0' style={{ fontSize: '1.2vw' }}>*/}
          {/*  {' '}*/}
          {/*  Contact us: 02081254786{' '}*/}
          {/*</p>*/}
          <a className='navbar-brand responsive-time-logo' style={{ width: '40%' }} href='#' >
            <img src={Logo} style={{ width: '30%' }} alt='logo' />
          </a>
        </div>
        {/*<div className='col-md-4'>*/}
        {/*  <p className='m-0' style={{ fontSize: '1.2vw' }}>*/}
        {/*    {new Date().toLocaleString()}*/}
        {/*  </p>*/}
        {/*</div>*/}
        <div>
          <div className='d-flex align-items-center'>
            {/*<img alt='search' src={Search} className='btn search-icon' />*/}
            <p
                className='m-0 btn zoki-btn zoki-btn-secondary login-btn-responsive'
                onClick={() => history.push('/login')}
            >
              Log in
            </p>
            {/*<Link to='#'>*/}
            {/*  <img alt='fb' src={Facebook} className='btn' />*/}
            {/*</Link>*/}

            {/*<Link to='#'>*/}
            {/*  <img alt='twitter' src={Twitter} className='btn' />*/}
            {/*</Link>*/}

            {/*<Link to='#'>*/}
            {/*  <img alt='yt' src={Youtube} className='btn' />*/}
            {/*</Link>*/}

            {/*<Link to='#'>*/}
            {/*  <img alt='linkedin' src={Linkedin} className='btn' />*/}
            {/*</Link>*/}


          </div>
        </div>
      </div>
      <hr className='text-dark m-0 p-0 mb-2' />
    </nav>
  );
}

export default TopNavBar;
