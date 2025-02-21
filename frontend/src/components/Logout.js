import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory();

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    setTimeout(() => {
      history.push("/");
    }, 1000);
  }, [history]);

  return (
    <div className="logout-page">
      <h1>Logging out...</h1>
      <p>You will be redirected to the signup page shortly.</p>
    </div>
  );
}

export default Logout;
