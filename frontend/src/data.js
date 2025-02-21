import React, { useEffect } from "react";
import axios from "axios";

const data = [
    {
        key: 1,
        title: "Feed My Hungry Children",
        content: "Make the world better, kinder, brighter. Every coin you give will create real change.",
        amount: 5000,
    },
    {
        key: 2,
        title: "GiveIndia Campaign",
        content: "GiveIndia’s campaign to help vaccinate the country’s citizens from COVID-19 succeeds on this basis.",
        amount: 7000,
    },
    {
        key: 3,
        title: "Gift a New Year Dream",
        content: "Make a child's New Year awesome by being the change you want to see, ensuring they have a brighter, happier future.",
        amount: 3000,
    },
    {
        key: 4,
        title: "Cycle for Survival",
        content: "Support the P2P Fundraiser for Memorial Sloan Kettering to advance cancer research and patient care.",
        amount: 2000,
    },
];

// useEffect(() => {
//     axios
//         .get("http://localhost:4000/admin")
//         .then((res) => {
//             this.setState({ data: res.data });
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }, []);

function updation() {
    axios
        .get("http://localhost:4000/admin")
        .then((res) => {
            this.setState({ data: res.data });
        })
        .catch((error) => {
            console.log(error);
        });
}

updation();

console.log(data);

export default data;
