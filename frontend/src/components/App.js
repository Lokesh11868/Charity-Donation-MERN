import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Campaigns from './Campaigns';
import Contact from './Contact';
import Cards from './Card';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import AllCampaigns from './AllCampaigns';
import Admin from './Admin';
import UpdateCampaign from './UpdateCampaign';
import PaymentForm from './PaymentForm';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [campdata, setCampdata] = useState(() => {
    // Load campdata from localStorage if available
    const savedCampdata = localStorage.getItem('campdata');
    return savedCampdata ? JSON.parse(savedCampdata) : [];
  });

  useEffect(() => {
    // Save campdata to localStorage whenever it changes
    localStorage.setItem('campdata', JSON.stringify(campdata));
  }, [campdata]);

  const addCampaign = (newCampaign) => {
    setCampdata((prevCampdata) => [...prevCampdata, newCampaign]);
  };

  // Function to conditionally render the Navbar
  const ConditionalNavbar = () => {
    const location = useLocation();
    const noNavbarRoutes = ['/login', '/']; // List routes where Navbar should not appear
    return !noNavbarRoutes.includes(location.pathname) && <Navbar />;
  };

  return (
    <Router>
      <div className="App">
        <ConditionalNavbar />
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/campaigns" component={Campaigns} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/card" component={Cards} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/AllCampaigns">
            <AllCampaigns campdata={campdata} />
          </Route>
          <ProtectedRoute exact path="/admin">
            <Admin addCampaign={addCampaign} />
          </ProtectedRoute>
          <ProtectedRoute exact path="/updatecampaign" component={UpdateCampaign} />
          <Route exact path="/paymentform" component={PaymentForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
