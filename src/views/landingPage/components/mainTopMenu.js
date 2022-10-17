import Logo from 'assets/logo.png';

function MainTopMenu() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light p-0'>
      <div className='container'>
        {/*<a className='navbar-brand' style={{ width: '30%' }} href='#'>*/}
        {/*  <img src={Logo} style={{ width: '30%' }} alt='logo' />*/}
        {/*</a>*/}
        <button
          className='navbar-toggler responsive-time-togglebutton'
          type='button'
          data-toggle='collapse'
          data-target='#mainTopMenu'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse main-top-menu justify-content-between' id='mainTopMenu'>
          <ul className='navbar-nav'>
            <li className={`nav-item active mx-2`}>
              <a className='nav-link' href='/'>
                Home <span className='sr-only'>(current)</span>
              </a>
            </li>
            {/* <li className="nav-item mx-2" style={{ fontSize: '1.7vw' }}>
                            <a className="nav-link" href="#">Tours <span className="sr-only">(current)</span></a>
                        </li> */}
            <li className='nav-item mx-2' >
              <a className='nav-link' href='search-hotels'>
                Hotels <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li className='nav-item mx-2' >
              <a className='nav-link' href='search-packages'>
                Packages <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li className='nav-item mx-2'>
              <a className='nav-link' href='#zoki-contact'>
                Contact Us <span className='sr-only'>(current)</span>
              </a>
            </li>
          </ul>
          <button
            type='button'
            className='btn zoki-btn zoki-btn-secondary nav-btn-responsive-booknow'
            style={{ backgroundColor: '#9C8E35' }}
          >
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MainTopMenu;
