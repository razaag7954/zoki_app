import AboutUsImg from "./img/main_page/about us.png";
import PriceList from "./img/main_page_icons/dollar-list.png";

function AboutUs() {
  return (
    <div className="container mt-5">
      <div className="row" style={{ color: "#02122c" }}>
        <div className="col-lg-6 px-4">
          <h6 className="my-3 text-bold font-italic text-size-medium" > INRTODUCTION ABOUT US </h6>
          <h1 className="my-3 text-bold about-us-heading font-italic">
            <span style={{ color: "#003a8c" }} className="text-decoration-dashed"> Book </span>
            an affordable flights and fantastic holiday with Zoki{" "}
          </h1>
          {/*<p>*/}
          {/*  {" "}*/}
          {/*  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do*/}
          {/*  eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim*/}
          {/*  ad minim veniam quis nostrud exercitation ullam{" "}*/}
          {/*</p>*/}
          <div className="row my-2">

            <div className="col-lg-9 my-3">
              <h6 className="m-0 text-bold font-italic"> Best Price Guaranteed </h6>
              <p className="m-0">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipiscing elitLorem
                ipsum dolor sit amet consectetur adipiscing elit{" "}
              </p>
            </div>
            <div className="col-lg-3">
              <img alt="dollar-list" src={PriceList} />
            </div>
          </div>
          <button
              className="btn px-5 mt-3 p-2 zoki-btn"
              // style={{ color: "#CFBD45", backgroundColor: "black" }}
          >
            <p className="mb-0"> Read More </p>
          </button>
        </div>
        <div className="col-lg-6 position-relative">
          <div
            className="bg-dark p-3 w-50 position-absolute shadow"
            style={{ top: 25, left: 25, border: "5px solid white" }}
          >
            <h2 className="text-white text-bold font-italic"> Traveler's Best Choice </h2>
          </div>
          <img src={AboutUsImg} alt="about us" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
