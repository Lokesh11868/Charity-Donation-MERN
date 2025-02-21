import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import axios from "axios";

function Card() {
  const history = useHistory();
  const location = useLocation();

  const [donorInfo, setDonorInfo] = useState({});

  useEffect(() => {
    // identification data of clicked campaign
    let info = {
      title: location.state.title,
      content: location.state.content
    };

    axios
      .post("http://localhost:4000/donorinfo", info)
      .then((res) => { setDonorInfo(res.data) })
      .catch((error) => console.log(error));

  }, []);

  function message() {
    alert("This campaign is closed because either it is complete or due to some emergency");
    console.log("CLOSED");
  }

  // for scroll page to top 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="Card-page">
      {/* PROGRESS BAR */}
      <div className="card-progress">
        <h2><b>DONATION PROGRESS BAR</b></h2>
        <section className="progress-bar">
          <div className="progress" style={{ height: "70px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: (donorInfo ? (donorInfo.donation) / (donorInfo.amount) * 100 : 0) + "%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <h5>
                {/* percentage of progress in bar */}
                {(donorInfo && (donorInfo.donation > 0)) ? ((donorInfo.donation) / (donorInfo.amount) * 100).toFixed(2) + "%" + " [ Rs." + donorInfo.donation + " ]" : "0%"}
              </h5>
            </div>
          </div>
        </section>

        {/* NEEDY PERSON INFORMATION CONTAINER */}
        <section>
          <div id="cards" className="twocolor-card card-content">
            <img
              className="card-img"
              src={require("../images/donatenow.webp").default}
              alt="logo"
            />

            <div>
              <div className="card-info">
                <h1>
                  <b>{location.state.title}</b>
                </h1>

                <h4>
                  {location.state.content}
                </h4>
              </div>

              <div className="card-amount-button">
                <div className="card-amount">
                  <h2><b>REQUIRED AMOUNT: Rs.{location.state.amount}</b></h2>
                </div>

                <br />

                <button type="button" className="btn btn-success btn-lg"
                  onClick={() => {
                    history.push({
                      pathname: '/',
                      state: {  // location state
                      },
                    });
                  }}
                >
                  BACK
                </button>

                <button type="button" className="btn btn-success btn-lg"
                  disabled={((donorInfo && (donorInfo.donation >= donorInfo.amount)) || donorInfo.buttonStatus) ? true : false}
                  onClick={() => {
                    history.push({
                      pathname: '/paymentform',
                      state: {  // location state
                        title: location.state.title,
                        content: location.state.content
                      },
                    });
                  }}
                >
                  DONATE NOW
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* PROUD DONORS LIST */}
      <section className="card-donorlist">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">TRANSACTION ID</th>
              <th scope="col">AMOUNT (Rs.)</th>
              <th scope="col">TRANSACTION STATUS</th>
            </tr>
          </thead>

          <tbody>
            {donorInfo && donorInfo.donor && donorInfo.donor.length > 0 ? (
              donorInfo.donor.map((info, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{info.id}</td>
                  <td>{info.donatedmoney}</td>
                  <td>{info.status}</td>
                </tr>
              ))
            ) : (
              // The table will be empty if no donor data exists
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No donors available yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Card;
