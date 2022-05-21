import React from "react";
import { useState, useEffect } from "react";
import { Form } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../../Components/css/login.css"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["user"]);
  useEffect(() => {
    if (localStorage.getItem("email")) {
      history.push("/Page");
      console.log(localStorage.getItem("email"));
    } else {
      history.push("./Login");
    }
  }, []);
  async function login() {
    let signin = {
      email: email,
      password: password,
    };
    console.log(email, password);
    let item = { email, password };
    let result = await fetch("http://localhost:3001/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(signin),
    });
    result = await result.json();
    console.warn(result);
    const token = result[0].email;
    console.log(token);
    //  const userId = result.ResponseData
    //  console.log(userId)
    localStorage.setItem("email", token);
     window.location.href = "/Page";
    setCookie("email", email, { path: "/" });
  }
  const onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
  };

  //   function getToken() {

  //     let value = ""
  //        let keys = Object.keys(localStorage)
  //        let i = keys.length

  //     while ( i-- ) {
  //        if(localStorage.getItem(keys[i].includes("twk_token"))){
  //         value = localStorage.getItem(keys[i])
  //        }
  //     }

  //     return value
  // }
  
  return (
    <div className="App">
      <h2 className="heading">Login</h2>
      <div className="Form">
      <Form role="form" onSubmit={onFormSubmit}>
        <label className="login">Email:</label>
        <input
          type="email"
          name="email"
          required=""
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-email"
        />
        <label className="login">Password:</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btnlogin" onClick={login}>
          Submit
        </button>
      </Form>
      </div>
    </div>
  );
};

export default Login;
