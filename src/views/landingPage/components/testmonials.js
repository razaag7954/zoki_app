import Customer from "./img/main_page/customer.jpeg";
import TestBg from  "../../../assets/img/pexels-dylan-leagh-11389485.jpg"
import Customer1 from "../../../assets/img/custome1.jpg"
import Customer2 from "../../../assets/img/custome2.jpg"
import Customer3 from "../../../assets/img/custome3.jpg"
import Customer4 from "../../../assets/img/custome4.jpg"
import {Carousel} from "react-responsive-carousel";
function Testmonials() {
  return (
    <div className="my-5">
      <div
        className="text-white"
        style={{
          backgroundImage: `url(${TestBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-start testimonial-container p-5">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <h6 className={"responsive-subcription-heading"}> Sign up for our News Letter </h6>
            <h1 className="my-3 responsive-subcription-subheading"> Be The First To Know About Deals </h1>
            <h6>
              {" "}
              Sign up for latest deals, packages, promotions from ZOKI, grab the
              limited packages/ticket deals from Zoki at first{" "}
            </h6>
            <form action="">
            <div className="d-flex responsive-form-subscription">
                <input
                    type="text"
                    className="subscription-filed w-100 p-3"
                    placeholder="Email"
                    aria-label="Username"
                />
                <button
                    className="btn zoki-btn zoki-btn-secondary responsive-btn"
                    // style={{ backgroundColor: "black" }}
                >
                  {" "}
                  Subscribe{" "}
                </button>


            </div>
            </form>
          </div>
        </div>
      </div>
      <div className="pb-3" style={{ backgroundColor: "#f1f2f8" }}>
        <div className="pb-3">
          <div className="container">
            <div className="row py-5">
              <div className="col-lg-5 col-md-12 col-12">
                <h1 className="text-dark text-bold font-italic"> Fly With Zoki </h1>
                <h2 className="text-dark text-bold font-italic"> World Leading Travel Brand: </h2>
                <hr className="border border-5 pe-5 me-5 text-start" />
                <h3 className="my-3" style={{color:"#084eb2"}}>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </h3>
                <h6 className="text-dark my-3"> <span style={{color: '#084eb2'}}>4.9+ / 5.0</span> AS REVIEWED </h6>
              </div>
              <div className="col-lg-7 col-md-12 col-12">
                <Carousel>
                  <div>
                    <div className="bg-white rounded shadow-sm p-3 text-center">
                      <div style={{height: '190px'}}>
                        <img
                            alt="customer"
                            src={Customer}
                            className="w-25 my-3 rounded-circle"
                        />
                      </div>

                      <h3> Zoe Quarla </h3>
                      <div className={"w-75 mx-auto mb-3"}>
                        Customer testimonials are a benificial type of
                        social proof. They tell ponencial new potential new
                        customers about the success and trimps others have
                        experienced.
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white rounded shadow-sm p-3 text-center">
                      <div style={{height: '190px'}}>
                        <img
                            alt="customer"
                            src={Customer2}
                            className="w-25 my-3 rounded-circle"
                        />
                      </div>

                      <h3> Mikel </h3>
                      <div className={"w-75 mx-auto mb-3"}>
                        Customer testimonials are a benificial type of
                        social proof. They tell ponencial new potential new
                        customers about the success and trimps others have
                        experienced.
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white rounded shadow-sm p-3 text-center">
                      <div style={{height: '190px'}}>
                        <img
                            alt="customer"
                            src={Customer3}
                            className="w-25 my-3 rounded-circle"
                        />
                      </div>

                      <h3> Mikel </h3>
                      <div className={"w-75 mx-auto mb-3"}>
                        Customer testimonials are a benificial type of
                        social proof. They tell ponencial new potential new
                        customers about the success and trimps others have
                        experienced.
                      </div>
                    </div>
                  </div>

                </Carousel>
                {/*<div*/}
                {/*  id="testmonialsCarousal"*/}
                {/*  className="carousel slide"*/}
                {/*  data-ride="carousel"*/}
                {/*>*/}
                {/*  <div className="carousel-inner">*/}
                {/*    <div className="carousel-item active">*/}
                {/*      <div className="row">*/}
                {/*        <div className="col-6">*/}
                {/*          <div className="bg-white rounded shadow-lg p-3 text-center">*/}
                {/*            Customer testimonials are a benificial type of*/}
                {/*            social proof. They tell ponencial new potential new*/}
                {/*            customers about the success and trimps others have*/}
                {/*            experienced.*/}
                {/*            <img*/}
                {/*              alt="customer"*/}
                {/*              src={Customer}*/}
                {/*              className="w-25 my-3 rounded-circle"*/}
                {/*            />*/}
                {/*            <h3> Zoe Quarla </h3>*/}
                {/*          </div>*/}
                {/*        </div>*/}
                {/*        <div className="col-6">*/}
                {/*          <div className="bg-white rounded shadow-lg p-3 text-center">*/}
                {/*            Customer testimonials are a benificial type of*/}
                {/*            social proof. They tell ponencial new potential new*/}
                {/*            customers about the success and trimps others have*/}
                {/*            experienced.*/}
                {/*            <img*/}
                {/*              alt="customer"*/}
                {/*              src={Customer}*/}
                {/*              className="w-25 my-3 rounded-circle"*/}
                {/*            />*/}
                {/*            <h3> Zoe Quarla </h3>*/}
                {/*          </div>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    <div className="carousel-item">*/}
                {/*      <div className="row">*/}
                {/*        <div className="col-6">*/}
                {/*          <div className="bg-white rounded shadow-lg p-3 text-center">*/}
                {/*            Customer testimonials are a benificial type of*/}
                {/*            social proof. They tell ponencial new potential new*/}
                {/*            customers about the success and trimps others have*/}
                {/*            experienced.*/}
                {/*            <img*/}
                {/*              alt="customer"*/}
                {/*              src={Customer}*/}
                {/*              className="w-25 my-3 rounded-circle"*/}
                {/*            />*/}
                {/*            <h3> Zoe Quarla </h3>*/}
                {/*          </div>*/}
                {/*        </div>*/}
                {/*        <div className="col-6">*/}
                {/*          <div className="bg-white rounded shadow-lg p-3 text-center">*/}
                {/*            Customer testimonials are a benificial type of*/}
                {/*            social proof. They tell ponencial new potential new*/}
                {/*            customers about the success and trimps others have*/}
                {/*            experienced.*/}
                {/*            <img*/}
                {/*              alt="customer"*/}
                {/*              src={Customer}*/}
                {/*              className="w-25 my-3 rounded-circle"*/}
                {/*            />*/}
                {/*            <h3> Zoe Quarla </h3>*/}
                {/*          </div>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    <div className="carousel-item">*/}
                {/*      <div className="row">*/}
                {/*        <div className="col-6">*/}
                {/*          <div className="bg-white rounded shadow-lg p-3 text-center">*/}
                {/*            Customer testimonials are a benificial type of*/}
                {/*            social proof. They tell ponencial new potential new*/}
                {/*            customers about the success and trimps others have*/}
                {/*            experienced.*/}
                {/*            <img*/}
                {/*              alt="customer"*/}
                {/*              src={Customer}*/}
                {/*              className="w-25 my-3 rounded-circle"*/}
                {/*            />*/}
                {/*            <h3> Zoe Quarla </h3>*/}
                {/*          </div>*/}
                {/*        </div>*/}
                {/*        <div className="col-6">*/}
                {/*          <div className="bg-white rounded shadow-lg p-3 text-center">*/}
                {/*            Customer testimonials are a benificial type of*/}
                {/*            social proof. They tell ponencial new potential new*/}
                {/*            customers about the success and trimps others have*/}
                {/*            experienced.*/}
                {/*            <img*/}
                {/*              alt="customer"*/}
                {/*              src={Customer}*/}
                {/*              className="w-25 my-3 rounded-circle"*/}
                {/*            />*/}
                {/*            <h3> Zoe Quarla </h3>*/}
                {/*          </div>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testmonials;
