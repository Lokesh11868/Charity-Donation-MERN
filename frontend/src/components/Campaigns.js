import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { notes } from "./Admin"; // Assuming notes is some other data you want to use
import data from "../data"; // Importing data from the local file
import axios from "axios"; // Remove axios if not needed anymore

function Campaigns() {
  const [campaignData, setCampaignData] = useState(data); // Use imported data directly
  const history = useHistory();

  return (
    <div className="Carousel">
      <section>
        <h1 className="campaigns-heading" style={{ margin: "1% 0% .5% 4%" }}>
          <b>ONGOING CAMPAIGNS</b>
        </h1>

        <Link to="/AllCampaigns" className="link">
          <button type="button" className="btn btn-success btn-lg">
            MORE CAMPAIGNS
          </button>
        </Link>
      </section>

      <div id="campaigns" style={{ backgroundColor: "#9D50BB" }}>
        <div id="testimonial-carousal" className="carousel slide" data-ride="false" data-interval="3000">
          <div className="carousel-inner">
            {/* Since carousel should have at least one slide with the class "active", we add the active class here */}
            <div className="carousel-item active">
              <h1 className="campaign-firstslide">
                <b>BE A PROUD DONOR</b>
              </h1>
            </div>

            {/* Map through the data and create a carousel item for each campaign */}
            {campaignData.map((info, index) => (
              <div className="carousel-item" key={index}>
                <div id="campaigns" className="twocolor-campaign campaign-content">
                  <img
                    className="campaign-img"
                    src={require("../images/donation.jpg").default}
                    alt="Campaign logo"
                  />

                  <div>
                    <div className="campaign-info">
                      <h3>
                        <b>{info.title}</b>
                      </h3>
                      <p>{info.content.slice(0, 150)}...</p> {/* Show a preview of the content */}
                    </div>

                    <div className="campaign-amount-button">
                      <div className="campaign-amount">
                        <b>REQUIRED AMOUNT: Rs. {info.amount}</b>
                      </div>

                      <button
                        type="button"
                        className="btn btn-success btn-lg"
                        onClick={() => {
                          // Redirect to the donation page
                          history.push({
                            pathname: "/card",
                            state: {
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
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <a
            className="carousel-control-prev"
            href="#testimonial-carousal"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </a>

          <a
            className="carousel-control-next"
            href="#testimonial-carousal"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Campaigns;
