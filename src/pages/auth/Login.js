import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="container p-4">
      <div className="row">
        <img
          className="img-fluid"
          src="/login.jpg"
          alt=""
          style={{ height: "400px", width: "400px" }}
        />
        <div className="col-md-3 offset-md-1 mt-5">
          <h4>Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control mb-3"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                autoFocus
                placeholder="Please enter email"
              />
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Please enter password"
              />
              <button
                type="submit"
                className="btn btn-outline-secondary mt-3 float-start"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
