import React, { useState } from "react";
import "./styles/login.css";
import firebase from ".././firebase";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const db = firebase.firestore();
  const handleSubmit = () => {
    var dataSet = {
      uname: uname,
      password: password
    };
    db.collection("users")
      .doc()
      .set(dataSet)
      .then(() => {
        // toast.success(`Thank you for registering!`, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        console.log("added to users table");
        history.push("/");
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="u"
          placeholder="Username"
          required="required"
          onChange={(e) => {
            setUname(e.target.value);
          }}
        />
        <input
          type="password"
          name="p"
          placeholder="Password"
          required="required"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" class="btn btn-primary btn-block btn-large">
          Login
        </button>
      </form>
    </div>
  );
}