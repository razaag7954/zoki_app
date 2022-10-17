import Tab1 from "./img/main_page/tab_1_bg.png";
import Tab2 from "./img/main_page/tab_2_bg.png";
import Tab3 from "./img/main_page/tab_3_bg.png";
import FlightForm from "./flightForm";
import HotelForm from "./hotelForm";
import CarForm from "./carForm";
import CharterForm from "./charterForm";
import FlightHotelForm from "./flightHotelForm";
import {HeroSection} from "../utils/constant";
function BookingQuickForm({setImage}) {
  return (
    <div className={"my-carouse-container"}>
      <div className="container z-index-33">
        <ul className="nav my-tab" id="bookingQuickForm" role="tablist" >
          <li className="z-index-33 nav-item" >
            <div
              className="nav-link active zoki-btn zoki-form-tab"
              id="flights-tab"
              data-toggle="tab"
              href="#flights"
              role="tab"
              aria-controls="flights"
              aria-selected="true"
              onClick={()=> setImage(HeroSection.FLIGHT)}
            >
              <i className="fa fa-plane" /> Flights
            </div>
          </li>
          <li className="z-index-33 nav-item" >
            <div
              className="nav-link zoki-btn zoki-form-tab"
              id="hotel-tab"
              data-toggle="tab"
              href="#hotel"
              role="tab"
              aria-controls="hotel"
              aria-selected="true"
              onClick={()=> setImage(HeroSection.HOTEL)}
            >
              <i className="fa fa-hotel" /> Hotel
            </div>
          </li>
          <li className="z-index-33 nav-item" >
            <div
              className="nav-link zoki-btn zoki-form-tab"
              id="flightHotel-tab"
              data-toggle="tab"
              href="#flightHotel"
              role="tab"
              aria-controls="flightHotel"
              aria-selected="true"
              onClick={()=> setImage(HeroSection.FLIGHT_HOTEL)}
            >
              <i
                className="fa fa-plane d-inline mr-2"
              />
              <i className="fa fa-hotel" /> Flight+Hotel
            </div>
          </li>
          <li className="z-index-33 nav-item" >
            <div
              className="nav-link zoki-btn zoki-form-tab"
              id="charter-tab"
              data-toggle="tab"
              href="#charter"
              role="tab"
              aria-controls="charter"
              aria-selected="true"
              onClick={()=> setImage(HeroSection.CHARACTER)}
            >
              <i className="fa fa-plane" /> Charter
            </div>
          </li>
          {/*<li className="nav-item">
                        <div
                            style={{ cursor: 'pointer', backgroundColor: '#857A34', color: 'white', borderRadius: 5, boxShadow: '0px 0px 10px rgba(0,0,0,0.8)' }}
                            className="nav-link py-1 px-5"
                            id="car-tab"
                            data-toggle="tab"
                            href="#car"
                            role="tab"
                            aria-controls="car"
                            aria-selected="true">
                            <i className='fa fa-car' /> Car Hire
                        </div>
                    </li> */}
        </ul>
        <div className="tab-content my-tab-content" id="bookingQuickFormContent">
          <div
            style={{
              backgroundColor: "#02122c",
              // backgroundImage: `url(${Tab1})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="tab-pane fade show active"
            id="flights"
            role="tabpanel"
            aria-labelledby="flights-tab"
          >
            <div className="container px-4 pt-3">
              <FlightForm />
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#02122c",
              // backgroundImage: `url(${Tab2})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="tab-pane fade"
            id="hotel"
            role="tabpanel"
            aria-labelledby="hotel-tab"
          >
            <div className="container px-4 pt-3">
              <HotelForm />
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#02122c",
              // backgroundImage: `url(${Tab1})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="tab-pane fade"
            id="flightHotel"
            role="tabpanel"
            aria-labelledby="flightHotel-tab"
          >
            <div className="container px-4 pt-3">
              <FlightHotelForm />
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#02122c",
              // backgroundImage: `url(${Tab3})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="tab-pane fade"
            id="charter"
            role="tabpanel"
            aria-labelledby="charter-tab"
          >
            <div className="container px-4 pt-3">
              <CharterForm />
            </div>
          </div>
          {/* 
                    <div
                        style={{ backgroundColor: 'black', backgroundImage: `url(${Tab3})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
                        className="tab-pane fade"
                        id="car"
                        role="tabpanel"
                        aria-labelledby="car-tab"
                    >
                        <div className='container px-4 pt-3'>
                            <CarForm />
                        </div>
                    </div> */}
        </div>
      </div>
    </div>
  );
}

export default BookingQuickForm;
