import React from "react";
import ReactDOM from "react-dom";
import App from './components/App';
 import "bootstrap/dist/css/bootstrap.min.css"
import "./AppStyle.css"
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);