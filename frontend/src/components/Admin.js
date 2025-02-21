import React, { useState } from "react";
import CreateArea from "./CreateArea";

function Admin({ addCampaign }) {
  const [campdata, setCampdata] = useState(() => {
    const savedCampdata = localStorage.getItem("campdata");
    return savedCampdata ? JSON.parse(savedCampdata) : [];
  });

  const [deleteTitle, setDeleteTitle] = useState(""); // Input for campaign title
  const [message, setMessage] = useState(""); // Display success or failure message

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Add Campaign
  const handleAddCampaign = (newCampaign) => {
    addCampaign(newCampaign);
    setCampdata((prevCampdata) => [...prevCampdata, newCampaign]);
    localStorage.setItem("campdata", JSON.stringify([...campdata, newCampaign]));
  };

  // Delete Campaign
  const handleDeleteCampaign = () => {
    const updatedCampdata = campdata.filter(
      (campaign) => campaign.title.toLowerCase() !== deleteTitle.toLowerCase()
    );
    if (updatedCampdata.length === campdata.length) {
      setMessage("Campaign not found.");
    } else {
      setCampdata(updatedCampdata);
      localStorage.setItem("campdata", JSON.stringify(updatedCampdata));
      setMessage(`Campaign "${deleteTitle}" has been deleted.`);
    }
    setDeleteTitle(""); // Clear input field
  };

  return (
    <div className="admin-container">
      <button
        type="button"
        className="btn btn-danger btn-lg adminLogout"
        onClick={handleLogout}
      >
        LOGOUT
      </button>
      <div className="admin-content">
        <h3 className="AdminAddCampaignTitle">ADD CAMPAIGN</h3>
        <div className="AdminAddCampaignForm Adminform">
          <CreateArea onAdd={handleAddCampaign} />
        </div>

        <h3 className="AdminDeleteCampaignTitle">DELETE CAMPAIGN</h3>
        <div className="AdminDeleteCampaignForm">
          <input
            type="text"
            placeholder="Enter Campaign Title"
            value={deleteTitle}
            onChange={(e) => setDeleteTitle(e.target.value)}
            className="delete-input"
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeleteCampaign}
          >
            Delete
          </button>
        </div>
        {message && <p className="delete-message">{message}</p>}
      </div>
    </div>
  );
}

export default Admin;
