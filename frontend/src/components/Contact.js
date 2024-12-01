import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';

function Contact() {
  // State to hold form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission (optional, could connect to API)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Query Submitted");
    // Here you can add code to send the form data to your backend
  };

  return (
    <div id="contact" className="footer">
  {/* Main Flex Container */}
  <div className="footer-content">
    {/* Online Query Section */}
    <div className="footer-contact-quote online-query-section">
      <h2><b>ONLINE QUERY</b></h2>
      <form onSubmit={handleSubmit}>
        <div className="footer-query">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit Query
          </Button>
        </div>
      </form>
    </div>

    {/* Contact Us Section */}
    <div className="footer-contact-info">
      <h2><b>CONTACT US</b></h2>
      <h5><b><CallIcon />: 9573623670 , 6304714584</b></h5>
      <h5><b><EmailIcon />: lokeshbethala11868@gmail.com, bodigavignesh123@gmail.com</b></h5>
    </div>
  </div>

  {/* Footer Quote */}
  <div className="footer-quote">
    <h1><b>"THEY NEED YOU 🤝"</b></h1>
    <h4><b>"DEVELOPED BY: LOKESH, VIGNESH"</b></h4>
  </div>
</div>

  );
}

export default Contact;
