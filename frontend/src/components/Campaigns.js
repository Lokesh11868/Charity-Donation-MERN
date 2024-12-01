// import React,{useEffect,useState} from "react";
// import { Link,useHistory } from "react-router-dom";
// import { notes } from "./Admin";
// import { Component } from "react";
//  import data from "../data";
// import axios from "axios";

// //  export default class Campaigns extends Component {
// //    constructor(props) {
// //      super(props);
// //          this.state = {
// //        data: [],
// //      };
// //    }

// //    componentDidMount=()=> {
// //      axios
// //       .get("http://localhost:4000/admin")
// //        .then((res) => {
// //         this.setState({ data: res.data });
// //         console.log("response",res);
// //        })
// //       .catch((err) => console.log(err));
// //    }

  
// //    render() {
// //    const {data}=this.state;
// //     return (
// //       <div>
// //          <div className="Carousel">
// //            <section>
// //             <h1
// //                className="campaigns-heading"
// //              style={{ margin: "1% 0% .5% 4%" }}
// //            >
// //               <b>ONGOING CAMPAIGNS</b>
// //             </h1>

// //              <Link to="/AllCampaigns" className="link">
// //               <button type="button" class="btn btn-success btn-lg">
// //                  MORE CAMPAIGNS
// //                </button>
// //              </Link>
// //            </section>

// //            <div id="campaigns" style={{ backgroundColor: "grey" }}>
// //              <div
// //               id="testimonial-carousal"
// //               class="carousel slide"
// //                data-ride="false"
// //             >
// //               <div class="carousel-inner">
// //                 {/* since carousel should have altleast one slide having class:active,that why i made this otherwise each slide would have class:active which will create blunder */}
// //                 <div class="carousel-item active">
// //                   <h1 className="campaign-firstslide">
// //                     <b>BE A PROUD DONOR</b>
// //                    </h1>
// //                  </div>

// //                  {/* here we are inserting data from data.js into each carousel slide */}
// //                  {data.map((info) => (
// //                   <div class="carousel-item">
// //                      <div
// //                        id="campaigns"
// //                        className="twocolor-campaign campaign-content"
// //                      >
// //                       <img
// //                         className="campaign-img"
// //                          src={require("../images/about-img.jpg").default}
// //                          alt="logo"
// //                        />

// //                        <div>
// //                          <div className="campaign-info">
// //                            <h3>
// //                              <b>{info.title}</b>
// //                            </h3>

// //                            <p>{info.content.slice(0, 150)}</p>
// //                          </div>

// //                          <div className="campaign-amount-button ">
// //                            <div className="campaign-amount">
// //                              <b>REQUIRED AMOUNT:Rs.{info.amount}</b>
// //                            </div>

// //                            <button
// //                              type="button"
// //                             class="btn btn-success btn-lg"
// //                             onClick={() => {
// //                               this.props.history.push({
// //                                  pathname: "/card",
// //                                  state: {
// //                                    // location state
// //                                    title: info.title,
// //                                    content: info.content,
// //                                    amount: info.amount,
// //                                  },
// //                                });
// //                              }}
// //                            >
// //                             DONATE NOW
// //                            </button>
// //                          </div>
// //                        </div>
// //                      </div>
// //                    </div>
// //                 ))}
// //                </div>

// //               <a
// //                 class="carousel-control-prev"
// //                 href={"#testimonial-carousal"}
// //                 role="button"
// //                 data-slide="prev"
// //               >
// //                 <span class="carousel-control-prev-icon"></span>
// //                </a>

// //                <a
// //                 class="carousel-control-next"
// //                 href={"#testimonial-carousal"}
// //                 role="button"
// //                  data-slide="next"
// //                >
// //                  <span class="carousel-control-next-icon"></span>
// //                </a>
// //              </div>
// //           </div>
// //          </div>
// //       </div>
// //      );
// //   }
// //  }












// function Campaigns() {
//   const [data, setData] = useState([]);
//   const history = useHistory();

// useEffect(() => {
//   axios
//     .get("http://localhost:4000/admin")
//     .then((res) => {
//       // setTimeout(() => {
//       setData(res.data);

//       // },1000)
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }, []);

// console.log(data);

// return (
// <div className="Carousel">
//   <section>
//     <h1 className="campaigns-heading" style={{ margin: "1% 0% .5% 4%" }}>
//       <b>ONGOING CAMPAIGNS</b>
//     </h1>

//     <Link to="/AllCampaigns" className="link">
//       <button type="button" class="btn btn-success btn-lg">
//         MORE CAMPAIGNS
//       </button>
//     </Link>
//   </section>

//   <div id="campaigns" style={{ backgroundColor: "grey" }}>
//     <div id="testimonial-carousal" class="carousel slide" data-ride="false">
//       <div class="carousel-inner">
//         {/* since carousel should have altleast one slide having class:active,that why i made this otherwise each slide would have class:active which will create blunder */}
//         <div class="carousel-item active">
//           <h1 className="campaign-firstslide">
//             <b>BE A PROUD DONOR</b>
//           </h1>
//         </div>

//         {/* here we are inserting data from data.js into each carousel slide */}
//         {data.map((info)=> (

//             <div class="carousel-item">
//               <div
//                 id="campaigns"
//                 className="twocolor-campaign campaign-content"
//               >
//                 <img
//                   className="campaign-img"
//                   src={require("../images/about-img.jpg").default}
//                   alt="logo"
//                 />

//                 <div>
//                   <div className="campaign-info">
//                     <h3>
//                       <b>{info.title}</b>
//                     </h3>

//                     <p>{info.content.slice(0, 150)}</p>
//                   </div>

//                   <div className="campaign-amount-button ">
//                     <div className="campaign-amount">
//                       <b>REQUIRED AMOUNT:Rs.{info.amount}</b>
//                     </div>

//                     <button
//                       type="button"
//                       class="btn btn-success btn-lg"
//                       onClick={() => {
//                         history.push({
//                           pathname: "/card",
//                           state: {
//                             // location state
//                             title: info.title,
//                             content: info.content,
//                             amount: info.amount,
//                           },
//                         });
//                       }}
//                     >
//                       DONATE NOW
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//         ))}
//       </div>

//       <a
//         class="carousel-control-prev"
//         href={"#testimonial-carousal"}
//         role="button"
//         data-slide="prev"
//       >
//         <span class="carousel-control-prev-icon"></span>
//       </a>

//       <a
//         class="carousel-control-next"
//         href={"#testimonial-carousal"}
//         role="button"
//         data-slide="next"
//       >
//         <span class="carousel-control-next-icon"></span>
//       </a>
//     </div>
//   </div>
// </div>
//   );
// }

// export default Campaigns;
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { notes } from "./Admin"; // Assuming notes is some other data you want to use
import data from "../data"; // Importing data from the local file
import axios from "axios"; // Remove axios if not needed anymore

function Campaigns() {
  const [campaignData, setCampaignData] = useState(data); // Use imported data directly
  const history = useHistory();

  useEffect(() => {
    // This effect is no longer necessary since we're using static data from `data.js`.
    // You can remove the axios call if you're using the static data.
    // axios
    //   .get("http://localhost:4000/admin")
    //   .then((res) => {
    //     setCampaignData(res.data); // Uncomment this if you're still fetching data
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }, []);

  return (
    <div className="Carousel">
      <section>
        <h1 className="campaigns-heading" style={{ margin: "1% 0% .5% 4%" }}>
          <b>ONGOING CAMPAIGNS</b>
        </h1>

        <Link to="/AllCampaigns" className="link">
          <button type="button" className="btn btn-success btn-lg">
            MORE CAMPAIGNS
          </button>
        </Link>
      </section>

      <div id="campaigns" style={{ backgroundColor: "#9D50BB" }}>
        <div id="testimonial-carousal" className="carousel slide" data-ride="false">
          <div className="carousel-inner">
            {/* Since carousel should have at least one slide with the class "active", we add the active class here */}
            <div className="carousel-item active">
              <h1 className="campaign-firstslide">
                <b>BE A PROUD DONOR</b>
              </h1>
            </div>

            {/* Map through the data and create a carousel item for each campaign */}
            {campaignData.map((info, index) => (
              <div className="carousel-item" key={index}>
                <div id="campaigns" className="twocolor-campaign campaign-content">
                  <img
                    className="campaign-img"
                    src={require("../images/donation.jpg").default}
                    alt="Campaign logo"
                  />

                  <div>
                    <div className="campaign-info">
                      <h3>
                        <b>{info.title}</b>
                      </h3>
                      <p>{info.content.slice(0, 150)}...</p> {/* Show a preview of the content */}
                    </div>

                    <div className="campaign-amount-button">
                      <div className="campaign-amount">
                        <b>REQUIRED AMOUNT: Rs. {info.amount}</b>
                      </div>

                      <button
                        type="button"
                        className="btn btn-success btn-lg"
                        onClick={() => {
                          // Redirect to the donation page
                          history.push({
                            pathname: "/card",
                            state: {
                              title: info.title,
                              content: info.content,
                              amount: info.amount,
                            },
                          });
                        }}
                      >
                        DONATE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <a
            className="carousel-control-prev"
            href="#testimonial-carousal"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </a>

          <a
            className="carousel-control-next"
            href="#testimonial-carousal"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Campaigns;
