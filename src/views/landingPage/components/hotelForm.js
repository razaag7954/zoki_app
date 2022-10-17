function HotelForm() {
  return (
    <>
      <div className="row mt-3 mb-1" style={{ fontSize: 12 }}>
        <div className="col-lg-4 px-1">
          <div className="w-100">
            <p className="mb-1"> Destination </p>
            <input
              type="text"
              className="tab-input form-control p-2 border-0 shadow-right text-secondary w-100"
              placeholder="Where are you going?"
            />
          </div>
        </div>
        <div className="col-lg-4 px-1">
          <div className="w-100">
            <p className="mb-1"> Check-in </p>
            <input
              type="date"
              className="tab-input form-control p-2 border-0 shadow-right text-secondary w-100"
            />
          </div>
        </div>
        <div className="col-lg-4 px-1">
          <div className="w-100">
            <p className="mb-1"> Check-out </p>
            <input
              type="date"
              className="tab-input form-control p-2 border-0 shadow-right text-secondary w-100"
              placeholder="New York (Any)"
            />
          </div>
        </div>
      </div>
      <div className="row mt-3 mb-1" style={{ fontSize: 12 }}>
        <div className="col-lg-4 px-1">
          <div className="w-100">
            <p className="mb-1"> Rooms </p>
            <select className="tab-input form-control p-2 border-0 shadow-right text-secondary w-100">
              <option> 1 </option>
              <option> 2 </option>
              <option> 3 </option>
              <option> 4 </option>
              <option> 5 </option>
              <option> 6 </option>
              <option> 7 </option>
              <option> 8 </option>
              <option> 9 </option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 px-1">
          <div className="w-100">
            <p className="mb-1"> Adults </p>
            <select className="tab-input form-control p-2 border-0 shadow-right text-secondary w-100">
              <option> 1 </option>
              <option> 2 </option>
              <option> 3 </option>
              <option> 4 </option>
              <option> 5 </option>
              <option> 6 </option>
              <option> 7 </option>
              <option> 8 </option>
              <option> 9 </option>
            </select>
          </div>
        </div>
        <div className="col-lg-4 px-1">
          <div className="w-100">
            <p className="mb-1"> Children </p>
            <select className="tab-input form-control p-2 border-0 shadow-right text-secondary w-100">
              <option> 0 </option>
              <option> 1 </option>
              <option> 2 </option>
              <option> 3 </option>
              <option> 4 </option>
              <option> 5 </option>
              <option> 6 </option>
              <option> 7 </option>
              <option> 8 </option>
              <option> 9 </option>
            </select>
          </div>
        </div>
      </div>
      <div className="row mt-3 mb-1">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <div className="form-check">
                <input
                  className="form-check-input form-check-box"
                  type="checkbox"
                  id="flexCheckDefault"
                  value=""
                  checked
                />
                <label className="form-check-label form-check-label">
                  <p style={{ color: "white" }}> Travel With Flexibility </p>
                </label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-check">
                <input
                  className="form-check-input form-check-box"
                  type="checkbox"
                  id="flexCheckDefault"
                  value=""
                  checked
                />
                <label className="form-check-label form-check-label">
                  <p style={{ color: "white" }}> Find Offers Worldwide </p>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-3" style={{ textAlign: "end" }}>
          <button
            className="btn zoki-btn"
            style={{ backgroundColor: "#B6A63C", color: "black" }}
          >
            <p className="mb-0">
              {" "}
              Search Hotel <i className="fa fa-arrow-right ms-2" />
            </p>
          </button>
        </div>
      </div>
    </>
  );
}

export default HotelForm;
