import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";
import axios from "axios";

const Login = () => {
  const [email, setemail] = useState("vaibhav.jadhav0596@gmail.com");
  const [password, setpassword] = useState("Vaibhav@123");
  const [loading, setloading] = useState(false);
  let dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history("/");
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await auth.signInWithEmailAndPassword(email, password.trim());
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult();
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}/user/create-update`,
          {},
          { headers: { Authorization: `Bearer ${idTokenResult.token}` } }
        )
        .then(async (res) => {
          toast.success(`RESPONSE: ${res.data}, STATUS: ${res.status}`);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              email: user.email,
              token: idTokenResult.token,
              uid: user.uid,
              name: user.name,
              picture: user.picture,
              emailVerified: user.emailVerified,
              role: user.role,
            },
          });
          setloading(false);
          history("/");
        })
        .catch(async (err) => toast.error(err.message));
    } catch (error) {
      toast.error(error.message);
      setloading(false);
    }
  };

  const googleLoginHandler = async () => {
    setloading(true);
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (res) => {
        const { user } = res;
        const idTokenResult = await user.getIdTokenResult();
        await axios
          .post(
            `${process.env.REACT_APP_BACKEND_API}/user/create-update`,
            {},
            { headers: { Authorization: `Bearer ${idTokenResult.token}` } }
          )
          .then(async (res) => {
            toast.success(`RESPONSE: ${res.data}, STATUS: ${res.status}`);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: user.email,
                token: idTokenResult.token,
                uid: user.uid,
                name: user.name,
                picture: user.picture,
                emailVerified: user.emailVerified,
                role: user.role,
              },
            });
            setloading(false);
            history("/");
          })
          .catch(async (err) => toast.error(err.message));
      })
      .catch((err) => {
        toast.error(err.message);
        setloading(false);
      });
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
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
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
                className="btn btn-outline-primary float-start my-3 mr-3"
              >
                Login
              </button>
            </div>
          </form>
          <div className="row d-block">
            <hr />
            <button
              className="btn btn-outline-danger my-3 btn-block w-auto"
              onClick={googleLoginHandler}
            >
              <GoogleOutlined />
              &nbsp;&nbsp;Login with Google
            </button>
          </div>
          <Link exact="true" to="/forgot/password" className="float-right mt-5">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
