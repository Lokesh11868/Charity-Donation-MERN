import React, { useState, useEffect } from "react";
import {Route , BrowserRouter as Router,Switch,Link} from "react-router-dom";
import Home from "./Home";
import About from "./About" ;
import Campaigns from "./Campaigns" ;
import Contact from "./Contact" ;
import Navbar from "./Navbar"
import Cards from "./Card"
import Admin from "./Admin"
import Login from "./Login"
import UpdateCampaign from "./UpdateCampaign"
import ProtectedRoute from "./ProtectedRoute"
import "../AppStyle.css";
import PaymentForm from "./PaymentForm";
import AllCampaigns from "./AllCampaigns";
import Signup from "./Signup";



function App(){

    const [checkLogin,setCheckLogin]=useState();
   

    useEffect(() => {
        try{
     
            const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setCheckLogin(loggedInUser);
          setCheckLogin(foundUser);
        }
    }
    
    catch(err){
        console.log(err)
    }
    
    }, []);


    return (
        <Router>

       {console.log("app login",checkLogin)}

            <Navbar/>
           
        <Route exact path="/"  component={Home}/>
        <Route exact path="/about"  component={About}/>
        <Route exact path="/campaigns"  element={<Campaigns />}/>
        <Route exact path="/contact"  component={Contact}/> 
        <Route exact path="/card"  component={Cards}/> 
        <Route exact path="/signup"  component={Signup}/> 
        <Route exact path="/login"  component={Login}/> 
        <Route exact path="/AllCampaigns"  component={AllCampaigns}/> 
        <ProtectedRoute exact path="/admin"  component={Admin}/> 
        <ProtectedRoute exact path="/updatecampaign"  component={UpdateCampaign}/> 
        <Route exact path="/paymentform"  component={PaymentForm}/> 
        </Router>
    );
}
export default App;