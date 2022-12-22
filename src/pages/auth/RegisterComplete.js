import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setloading] = useState(false);
  let dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password should be minimum 6 characters");
      return;
    }
    try {
      const res = await auth.signInWithEmailLink(email, window.location.href);
      if (res.user.emailVerified) {
        localStorage.removeItem("emailReg");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult)
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
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    setemail(localStorage.getItem("emailReg"));
  }, []);

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Registration Password</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control my-3"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              disabled={true}
            />
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              autoFocus
              autoComplete="new-password"
              placeholder="Please enter password"
            />
            <button
              type="submit"
              className="btn btn-outline-secondary mt-3 float-start"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
