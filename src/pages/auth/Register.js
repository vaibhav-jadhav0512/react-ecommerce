import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setemail] = useState("");
  const history = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const roleBasedRedirect = (role) => {
    if (role === "subscriber") {
      history("/subscriber");
    } else if (role === "admin") {
      history("/admin/dashboard");
    } else {
      history("/");
    }
  };
  useEffect(() => {
    if (user && user.token) roleBasedRedirect(user.role);
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email} Click the link to complete your registration`
    );
    localStorage.setItem("emailReg", email);
    setemail("");
  };
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Registration Email</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              autoFocus
              placeholder="Please enter email"
            />
            <button
              type="submit"
              className="btn btn-outline-secondary mt-3 float-start"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
