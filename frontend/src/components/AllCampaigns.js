import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import data from "../data";

function AllCampaigns() {
  const [campdata, setcampdata] = useState(data);
  const history = useHistory();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/admin")
  //     .then((res) => {
  //       setcampdata(res.campdata);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  //cards campdata
  console.log(campdata);

  return (
    <div>
      <h1 className="AllCampaigns-Title">
        <b>CAMPAIGNS</b>
      </h1>

      <section className="AllCampaigns-Card">
        {campdata.map((info, index) => (
          <div
            id="campaigns"
            className="twocolor-campaign AllCampaigns-content"
          >
            <img
              className="campaign-img"
              src={require("../images/donation.jpg").default}
              alt="logo"
            />

            <div>
              <div className="campaign-info">
                <h3>
                  <b>{info.title}</b>
                </h3>

                <p>{info.content}</p>
              </div>

              <div className="AllCampaigns-amount-button ">
                <div className="campaign-amount">
                  <b>REQUIRED AMOUNT:Rs.{info.amount}</b>
                </div>

                <button
                  type="button"
                  class="btn btn-success btn-lg"
                  onClick={() => {
                    history.push({
                      pathname: "/card",
                      state: {
                        // location state
                        title: info.title,
                        content: info.content,
                        amount: info.amount,
                      },
                    });
                  }}
                >
                  DONATE
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AllCampaigns;
