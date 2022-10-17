import PhoneOutline from './img/main_page_icons/call.png';
import Logo from 'assets/logo.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='text-white mt-5 pt-5' style={{ backgroundColor: '#02122c' }}>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3 my-3'>
            <img src={Logo} style={{ width: '60%' }} alt='logo' />
            <a href='#zoki-contact'>
              <button
                className='btn px-4 mt-3 p-2 zoki-btn'
                style={{ color: '#000', backgroundColor: '#00a698' }}
              >
                <p className='mb-0'> Read More </p>
              </button>
            </a>
          </div>
          <div className='col-lg-3 my-3 zoki-footer-link'>
            <h6> Flights </h6>
            <h6> Hotels </h6>
            <h6> Pick & Drop </h6>
            <h6> Packages </h6>
          </div>
          <div className='col-lg-3 my-3 zoki-footer-link'>
            <h6> About Zoki </h6>
            <h6> Our Team </h6>
            <h6> Announcements </h6>
            <h6> Contact Us </h6>
          </div>
          <div className='col-lg-3 my-3'>
            <div className='d-flex my-1 align-items-center'>
              <i
                className='fa fa-plane p-3 mr-3 rounded-circle'
                style={{ backgroundColor: '#00a698', color: 'black' }}
              />
              <p className='mb-0' style={{ fontSize: 14 }}>
                {' '}
                We are member of IATA{' '}
              </p>
            </div>
            <div className='d-flex my-1 align-items-center'>
              <i
                className='fa fa-phone p-3 mr-3 rounded-circle'
                style={{ backgroundColor: '#00a698', color: 'black' }}
              />
              <p className='mb-0' style={{ fontSize: 14 }}>
                {' '}
                02081254786
              </p>
            </div>
            <div className='d-flex my-1 align-items-center'>
              <i
                className='fa fa-envelope p-3 mr-3 rounded-circle'
                style={{ backgroundColor: '#00a698', color: 'black' }}
              />
              <p className='mb-0' style={{ fontSize: 14 }}>
                {' '}
                Hello@flywithzoki.com
              </p>
            </div>
          </div>
        </div>

        {/*bottom bar*/}

        <hr className='text-white mb-2' style={{ border: '1px solid gray' }} />
        <div className='row'>
          <div className='col-6 text-start'>
            <p>{`Copyright © Zoki ${new Date().getFullYear()}.`}</p>
          </div>
          <div className='col-6' style={{ textAlign: 'end' }}>
            <p> Terms & Conditions | Privacy Policy | Cookies Policy </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
