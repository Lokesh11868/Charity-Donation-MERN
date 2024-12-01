import React from "react";

function About() {
  return (
    <div id="about" className="about-content">
      
      <div className="about-text">
        <h1>Why Donation?</h1>
        <br/>
        Donating to charity is a meaningful way to support those in need and drive positive change. Your financial contribution helps provide essential resources such as food, shelter, healthcare, and education to individuals and communities facing challenges. By donating, you empower organizations to deliver their mission and create lasting impact. Each donation, no matter the size, plays a crucial role in addressing urgent needs and fostering long-term solutions. Your support helps make the world a better place by improving lives and contributing to the well-being of those less fortunate. Together, we can create a stronger, more compassionate future.
        <br></br>
        <br></br>
        "It’s not how much we give but how much love we put into giving."
        <br></br>                      — Mother Teresa
      </div>

      <div>
        <img className="about-img" src={require("../images/about.jpg").default} alt="logo"/>
      </div>


    </div>
  );
}

export default About;