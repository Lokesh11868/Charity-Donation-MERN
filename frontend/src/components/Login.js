import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";


function Login(props) {
  const [data, setData] = useState({});
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const [user, setUser] = useState()
  useEffect(() => {
     if (data.result === true) 
     {
       //set the state of the user
     setUser(data)
     //stoe the user in localStorage
     localStorage.setItem('user',data)
       return <Redirect to={{ pathname: "/admin", state: { loggedInStatus: data.result } }}/> 
  //     // return   <Redirect  to= "/admin"/>
  //     //   {/* <Redirect  to={{ pathname: "/admin", state: { loggedInStatus: data.result } }}/> */}
      
     }
    
     if (data.result === false) {
     return <Redirect to="/login" />;
    }
 }, [data]);


  function handleChange(event) {
    const { name, value } = event.target;

    setCredential((prevCredential) => {
      return {
        ...prevCredential,
        [name]: value,
      };
    });
  }

  function submitCredential(event) {
    event.preventDefault();

  const response=axios
      .post("http://localhost:4000/login", credential)
      .then((res) => {
        setData(res.data);
        
        console.log("local storage:",res.data)
      })
      .catch((error) => console.log(error));

    console.log("the credential");
    console.log(credential);

    setCredential({
      email: "",
      password: "",
    });
  }

 

  useEffect(() => {

    console.log("data insie useeffect",data);
    
    if (data.result === true) 
    {
      console.log(" if true data insie useeffect",data.result);
      
      //set the state of the user
    // setUser(data)
    //stoe the user in localStorage
    localStorage.setItem('user',JSON.stringify(data))
      // <Redirect to={{ pathname: "/admin", state: { loggedInStatus: data.result } }}/> 
      // return   <Redirect  to= "/admin"/>
      //   {/* <Redirect  to={{ pathname: "/admin", state: { loggedInStatus: data.result } }}/> */}



      history.push({
        pathname: '/admin',
        state: {  // location state
          loggedInStatus: data.result
        },
      }); 
      
    }
    
    if (data.result === false) {
      alert("Mr.Culprit,you need to take a break!");
      // <Redirect to="/login" />;

    }

  }, [data]);


  //check if user has previously logged in
  useEffect(() => {
   const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  return (
    <div className="Login-page">
      {/* <h1>LOGIN</h1> */}
      <form>
        Email
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={credential.email}
        />
        Password
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={credential.password}
        />
        <button type="submit" onClick={submitCredential}>
          Login
        </button>
      </form>

    </div>
  );
} 


export default Login;




// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";

// function Login(props) {
//   const [credential, setCredential] = useState({
//     email: "",
//     password: "",
//   });

//   const [data, setData] = useState({});
//   const [user, setUser] = useState(null);
//   const history = useHistory();

//   // Check if user is already logged in (from localStorage)
//   useEffect(() => {
//     const loggedInUser = localStorage.getItem('user');
//     if (loggedInUser) {
//       const foundUser = JSON.parse(loggedInUser);
//       setUser(foundUser);
//       history.push('/admin');  // Redirect to admin page
//     }
//   }, [history]);

//   // Handle input changes
//   function handleChange(event) {
//     const { name, value } = event.target;
//     setCredential((prevCredential) => ({
//       ...prevCredential,
//       [name]: value,
//     }));
//   }

//   // Handle form submission (login)
//   function submitCredential(event) {
//     event.preventDefault();

//     axios.post("http://localhost:4000/login", credential)
//       .then((res) => {
//         if (res.data.result === true) {
//           localStorage.setItem('user', JSON.stringify(res.data));
//           setData(res.data);
//           history.push('/admin');  // Navigate to the admin page
//         } else {
//           alert("Invalid credentials. Please try again.");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         alert("An error occurred. Please try again.");
//       });

//     setCredential({
//       email: "",
//       password: "",
//     });
//   }

//   return (
//     <div className="Login-page">
//       <form>
//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           onChange={handleChange}
//           value={credential.email}
//         />
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           value={credential.password}
//         />
//         <button type="submit" onClick={submitCredential}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;

