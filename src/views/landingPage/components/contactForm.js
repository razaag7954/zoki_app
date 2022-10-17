import ContactBg from "./img/main_page/contact.png";

function ContactForm() {
  return (
    <div
      id="zoki-contact"
      className="my-5"
      style={{
        backgroundImage: `url(${ContactBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container px-5" style={{ color: "#344767" }}>
        <div className="row">
          <div className="col-lg-6 shadow-lg rounded p-3 text-center">
            <h3 className="my-3">
              We'd Love To Help
            </h3>
            <h6>
              Let us help you find the right internet marketing solution.
            </h6>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control my-3"
                  placeholder="First Name"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control my-3"
                  placeholder="Last Name"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Number"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="E-mail"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </div>
            </div>
            <select
              className="form-control text-secondary bg-white"
              aria-label="Default select example"
            >
              <option> City </option>
              <option value="1"> Gujranwala </option>
              <option value="2"> Abc </option>
              <option value="3"> Xyz </option>
            </select>
            <textarea
              type="text"
              placeholder="Details (optional)"
              className="form-control w-100 my-3 p-3"
            />
            <button
              className="btn zoki-btn zoki-btn-success w-100"
            >
              {" "}
              Submit{" "}
            </button>
          </div>
          <div className="col-lg-6 px-5 py-5">
            <h2 className="text-bold font-italic"> Travel with Zoki </h2>
            <h3 className="text-bold font-italic"> Your world.Your way. </h3>
            <p>
              {" "}
              Our experienced team is just one form away from you, fill the
              form, or chat with our expert team member to book ticket for you,
              we are available for 24x7{" "}
            </p>
            <div className="row">
              <div className="col-lg-6 my-2">
                <button
                    className="btn zoki-btn zoki-btn-secondary w-100"
                >
                  {" "}
                  Contact Us{" "}
                </button>
              </div>
              <div className="col-lg-6 my-2">
                <button
                  className="btn zoki-btn zoki-btn-secondary w-100"
                >
                  {" "}
                  Talk To A Specialist{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
