import React from "react";
import About from "./About";
import Campaigns from "./Campaigns";
import Contact from "./Contact";
import { Link } from "react-scroll";
import "../AppStyle.css";
import {useTypewriter, Cursor} from 'react-simple-typewriter';
function Home() {
  const [text] = useTypewriter({
    words: [' heal.', ' feed.', ' educate.',' empower.'],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  return (
    <div id="home">
      <div className="home-content">
        <div className="home-text">
        <h1 style={{margin: '50px'}}>
          Your Donation can...
          <span style={{fontWeight:'bold',color:'#9D50BB' }}>
            { text}</span> 
          <Cursor cursorStyle='<'/>
        </h1>
        <Link
          to="campaigns"
          className="link"
          spy={true}
          smooth={true}
          activeClass="active"
          duration={1000}
        >
          <button type="button" class="btn btn-success btn-lg">
            DONATE NOW
          </button>
        </Link>
        </div>
        
      </div>

      <About />

      <Campaigns />

      <Contact />
    </div>
  );
}

export default Home;
