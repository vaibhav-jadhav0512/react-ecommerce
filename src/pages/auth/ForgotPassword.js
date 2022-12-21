import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then((res) => {
        setemail("");
        setloading(false);
        toast.success("Please check email for password reset link!");
      })
      .catch((err) => {
        toast.error(err.message);
        setloading(false);
      });
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <h4>Forgot password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-3"
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter email"
          autoFocus
        />
        <button className="btn btn-primary" type="submit" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
