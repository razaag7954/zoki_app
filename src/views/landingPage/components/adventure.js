import Fire from './img/main_page_icons/fire.svg';
import MountainIcon from './img/main_page_icons/mountain.svg';
import SearchFile from './img/main_page_icons/search-file.svg';
import Bag from './img/main_page_icons/path.svg';
import Direction from './img/main_page_icons/direction-road-sign.svg';
import Camping from './img/main_page_icons/camp-tent.svg';
import WaveDown from './img/main_page/wave down.png';
import Vacation from './img/vacation-1.jpg';
import Vacation1 from  '../../../assets/img/adventure.jpg'

function Adventure() {
  return (
    <>
      <div className='mt-5 mb-5 container text-center' style={{ color: '#344767' }}>
        <h6 className="text-bold font-italic"> TRAVEL BY ACTIVITY </h6>
        <h1 className="text-bold"> Adventure & Activity </h1>
        <div className='row mt-5'>
          <div className='col my-2 my-activity'>
            <div className='border p-3 mx-2'>
              <img alt='Mountain' src={MountainIcon} />
              <h5 className='fw-bolder my-2'> Adventure </h5>
              <p className='fw-bold'> 15 Destinations </p>
            </div>
          </div>
          <div className='col my-2 my-activity'>
            <div className='border p-3 mx-2'>
              <img alt='bag' src={Bag} />
              <h5 className='fw-bolder my-2'> Adventure </h5>
              <p className='fw-bold'> 15 Destinations </p>
            </div>
          </div>
          <div className='col my-2 my-activity'>
            <div className='border p-3 mx-2'>
              <img alt='fire' src={Fire} />
              <h5 className='fw-bolder my-2'> Adventure </h5>
              <p className='fw-bold'> 15 Destinations </p>
            </div>
          </div>
          <div className='col my-2 my-activity'>
            <div className='border p-3 mx-2'>
              <img alt='fire' src={Direction} />
              <h5 className='fw-bolder my-2'> Adventure </h5>
              <p className='fw-bold'> 15 Destinations </p>
            </div>
          </div>
          <div className='col my-2 my-activity'>
            <div className='border p-3 mx-2'>
              <img alt='fire' src={Camping} />
              <h5 className='fw-bolder my-2'> Adventure </h5>
              <p className='fw-bold'> 15 Destinations </p>
            </div>
          </div>
          <div className='col my-2 my-activity'>
            <div className='border p-3 mx-2'>
              <img alt='fire' src={SearchFile} />
              <h5 className='fw-bolder my-2'> Adventure </h5>
              <p className='fw-bold'> 15 Destinations </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className='text-white mb-5 position-relative'
        style={{
          backgroundImage: `url(${Vacation1})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/*<div*/}
        {/*  style={{*/}
        {/*    position: 'absolute',*/}
        {/*    top: 0,*/}
        {/*    left: 0,*/}
        {/*    height: '100%',*/}
        {/*    width: '100%',*/}
        {/*    background: 'rgba(0,0,0,0.8)',*/}
        {/*    zIndex: 0,*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<img*/}
        {/*  alt='wave down'*/}
        {/*  src={WaveDown}*/}
        {/*  className='w-100 position-relative'*/}
        {/*  style={{ zIndex: 1 }}*/}
        {/*/>*/}
        <div
          className='text-center p-0 position-relative'
          style={{ zIndex: 2 }}
        >
          <div className='container py-5'>
            <h2 className='mt-3 text-bold text-white'> Looking for air ticket in best price? </h2>
            <h2 className='mb-5 text-bold text-white'>
              {' '}
              Zoki will help you to find one, search book and go now!{' '}
            </h2>
            <button
              className='btn zoki-btn zoki-btn-secondary'
              // style={{
              //   color: '#CFBD45',
              //   backgroundColor: 'black',
              //   fontSize: 14,
              // }}
            >
              <p className='mb-0'> Book Your Trip Now  <i className="fa fa-arrow-right ms-2" /></p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adventure;
