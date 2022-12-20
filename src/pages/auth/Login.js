import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("vaibhav.jadhav0596@gmail.com");
  const [password, setpassword] = useState("Vaibhav@123");
  const [loading, setloading] = useState(false);
  let dispatch = useDispatch();
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await auth.signInWithEmailAndPassword(email, password.trim());
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      setloading(false);
      history("/");
    } catch (error) {
      toast.error(error.message);
      setloading(false);
    }
  };
  return (
    <div className="container p-4">
      <div className="row">
        <img
          className="img-fluid"
          src="/login.jpg"
          alt=""
          style={{ height: "400px", width: "450px" }}
        />
        <div className="col-md-3 offset-md-1 mt-5">
          {!loading ? (
            <h4>Login</h4>
          ) : (
            <div class="spinner-border text-primary mb-3" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
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
                className="btn btn-outline-primary mt-3 float-start"
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
