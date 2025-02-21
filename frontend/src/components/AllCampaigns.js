import React from 'react';
import { useHistory } from 'react-router-dom';
//import './AllCampaigns.css';

function AllCampaigns({ campdata = [] }) {
  const history = useHistory();

  const handleDonateClick = (campaign) => {
    history.push({
      pathname: '/paymentform',
      state: {
        title: campaign.title,
        content: campaign.content,
      },
    });
  };

  return (
    <div className="all-campaigns-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="AllCampaigns-Title">
          <b>CAMPAIGNS</b>
        </h1>
      </div>

      <section className="AllCampaigns-Card">
        {campdata.length === 0 ? (
          <p>No campaigns available at the moment.</p>
        ) : (
          campdata.map((info, index) => (
            <div
              id="campaigns"
              className="twocolor-campaign AllCampaigns-content"
              key={index}
            >
              <img
                className="campaign-img"
                src={info.image || require("../images/donation.jpg").default}
              />
              <div>
                <div className="campaign-info">
                  <h3>
                    <b>{info.title}</b>
                  </h3>
                  <p>{info.content}</p>
                  <div className="campaign-footer">
                    <span>Required Amount: {info.amount}</span>
                    <button className="donate-button" onClick={() => handleDonateClick(info)}>
                      DONATE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default AllCampaigns;