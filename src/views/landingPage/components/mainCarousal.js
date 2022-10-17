import WaveUp from './img/main_page/wave_up.png';
import Vacation from './img/vacation-1.jpg';
import TicketImg from  '../../../../src/assets/img/pexels-pixabay-38238.jpg'
import {useState} from "react";

function MainCaraousal({ children, image }) {
    // const [image, setImage] = useState(image);
    // const setBackgroundImage = (tabName) => {
    //     console.log(tabName, "this is tabName")
    // }
  return (
    <div
      className='text-white position-relative'
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${image})`,
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
      <div
        className='my-carousel'
        style={{ position: 'relative', zindex: 2 }}
      >
        <h1 className='pt-5 text-bold carousel-heading'>
          Search , Select, Book
          <span style={{ color: '#000' }}> & </span>
          Travel
        </h1>
        {/*<h6 className=''>*/}
        {/*  {' '}*/}
        {/*  Search tickets, hotels and pick & drop services with Zoki and make*/}
        {/*  your visit more convenient, super cool with our hot offers!{' '}*/}
        {/*</h6>*/}
      </div>
      {/*<img*/}
      {/*  alt='wave up'*/}
      {/*  src={WaveUp}*/}
      {/*  style={{ bottom: 0 }}*/}
      {/*  className='w-100 mt-5 position-absolute'*/}
      {/*/>*/}
      {children}
    </div>
  );
}

export default MainCaraousal;
