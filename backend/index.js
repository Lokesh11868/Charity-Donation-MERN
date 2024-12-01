const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require("path");
const https = require("https");
const qs = require("querystring");

const checksum_lib = require('./paytm/checksum');
const config = require('./paytm/config');

const saltRounds = 3;

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for build
app.use(express.static(path.join(__dirname, 'build')));

// Mongoose connection
mongoose.connect("mongodb://localhost:27017/donatedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema and Model definitions
const cardSchema = {
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  amount: { type: Number },
  donation: Number,
  buttonStatus: { type: Number, default: 0, validate: { validator: Number.isInteger, message: '{VALUE} is not an integer value' } },
  donor: [{
    orderid: { type: String, default: "" },
    donatedmoney: Number,
    status: { type: String, default: "" },
    id: { type: String, default: "" },
  }],
};

const Card = mongoose.model("Card", cardSchema);

// Routes
app.get('/react', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post("/admin", async (req, res) => {
  try {
    if (req.body.action === "delete") {
      await Card.deleteMany(req.body);
    } else {
      await Card.insertMany(req.body);
    }
    const docs = await Card.find({});
    res.send(docs);
  } catch (err) {
    console.log(err);
  }
});

app.get("/admin", async (req, res) => {
  try {
    const docs = await Card.find({});
    res.send(docs);
  } catch (err) {
    console.log(err);
  }
});


const contactSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
};

const Contact = mongoose.model("Contact", contactSchema);

// Route for handling contact form submissions
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !phone || !message) {
      return res.status(400).send("All fields are required.");
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).send("Query submitted successfully!");
  } catch (err) {
    console.error(err);
    console.error("Error occurred while submitting query:", err);
    res.status(500).send("Error occurred while submitting query. Please try again.");
  }
});


// Login Schema
const loginSchema = {
  email: String,
  password: String,
};
// const Login = mongoose.model("User", loginSchema);

// // Save default admin login


// // Login route
// app.post("/login", async (req, res) => {
//   try {
//     const user = await Login.findOne({ email: req.body.email });
//     if (user) {
//       const valid = await bcrypt.compare(req.body.password, user.password);
//       if (valid) {
//         const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '3s' });
//         res.header('auth-token', token).send({ token, email: user.email, result: true });
//       } else {
//         res.send({ result: false });
//       }
//     } else {
//       res.send({ result: false });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
const userSchema = {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
};

const User = mongoose.model("User", userSchema);
app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    res.status(201).send("User registered successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
});

// Middleware for auth
function auth(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

// Payment Gateway
app.post('/paynow', async (req, res) => {
  const { amount, email, phone, title, content } = req.body;
  if (!amount || !email || !phone) return res.status(400).send('Payment failed');

  const params = {
    MID: config.PaytmConfig.mid,
    WEBSITE: config.PaytmConfig.website,
    CHANNEL_ID: 'WEB',
    INDUSTRY_TYPE_ID: 'Retail',
    ORDER_ID: 'TEST_' + new Date().getTime(),
    CUST_ID: 'customer_001',
    TXN_AMOUNT: amount.toString(),
    CALLBACK_URL: 'http://localhost:4000/callback',
    EMAIL: email,
    MOBILE_NO: phone.toString(),
  };

  const card = await Card.findOne({ title, content });
  if (card) {
    await Card.updateOne({ _id: card._id }, {
      $set: {
        "donor.0.orderid": params.ORDER_ID,
        "donor.0.donatedmoney": amount,
        "donor.0.status": "Pending"
      }
    });
  }

  checksum_lib.genchecksum(params, config.PaytmConfig.key, (err, checksum) => {
    const txn_url = "https://securegw-stage.paytm.in/theia/processTransaction";
    const form_fields = Object.keys(params).map(key =>
      `<input type='hidden' name='${key}' value='${params[key]}' />`
    ).join('');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <head><title>Merchant Checkout Page</title></head>
        <body>
          <center><h1>Please do not refresh this page...</h1></center>
          <form method="post" action="${txn_url}" name="f1">
            ${form_fields}
            <input type='hidden' name='CHECKSUMHASH' value='${checksum}' />
          </form>
          <script type="text/javascript">document.f1.submit();</script>
        </body>
      </html>
    `);
    res.end();
  });
});

// Handle Payment Callback
app.post('/callback', async (req, res) => {
  let body = '';
  req.on('data', data => body += data);
  req.on('end', async () => {
    const post_data = qs.parse(body);
    const checksumhash = post_data.CHECKSUMHASH;
    const isValidChecksum = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);

    if (isValidChecksum) {
      const params = { MID: config.PaytmConfig.mid, ORDERID: post_data.ORDERID };
      checksum_lib.genchecksum(params, config.PaytmConfig.key, (err, checksum) => {
        params.CHECKSUMHASH = checksum;
        const post_data = `JsonData=${JSON.stringify(params)}`;
        const options = {
          hostname: 'securegw-stage.paytm.in',
          port: 443,
          path: '/merchant-status/getTxnStatus',
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': post_data.length },
        };

        const post_req = https.request(options, post_res => {
          let response = '';
          post_res.on('data', chunk => response += chunk);
          post_res.on('end', async () => {
            const _result = JSON.parse(response);
            if (_result.STATUS === 'TXN_SUCCESS') {
              await Card.updateOne({ "donor.orderid": post_data.ORDERID }, {
                $set: { "donor.$.status": "Success", "donor.$.id": _result.TXNID },
                $inc: { donation: _result.TXN_AMOUNT }
              });
              res.send('Payment Success');
            } else {
              res.send('Payment Failed');
            }
          });
        });
        post_req.write(post_data);
        post_req.end();
      });
    } else {
      res.send('Checksum Mismatch');
    }
  });
});

const defaultDonors = [
  { orderid: "ORD12345", donatedmoney: 100, status: "Success", id: "DONOR001" },
  { orderid: "ORD12346", donatedmoney: 200, status: "Success", id: "DONOR002" },
  { orderid: "ORD12347", donatedmoney: 300, status: "Pending", id: "DONOR003" },
  { orderid: "ORD12348", donatedmoney: 150, status: "Success", id: "DONOR004" },
  { orderid: "ORD12349", donatedmoney: 500, status: "Failed", id: "DONOR005" },
];

async function createDefaultDonors() {
  try {
    // Check if donors already exist, if not, insert them
    const card = await Card.findOne({ title: "Default Card" });
    if (!card) {
      const newCard = new Card({
        title: "Default Card",
        content: "This is a default card for testing.",
        amount: 1000, // Set a default amount or fetch dynamically if needed
        donation: defaultDonors.reduce((sum, donor) => sum + donor.donatedmoney, 0),
        donor: defaultDonors,
      });
      await newCard.save();
      console.log("Default donors created.");
    } else {
      console.log("Default donors already exist.");
    }
  } catch (error) {
    console.error("Error creating default donors:", error);
  }
}

// Call the function to insert the default donors
createDefaultDonors();


// Start Server
app.listen(process.env.PORT || 4000, () => {
  console.log("Server started on port 4000");
});
