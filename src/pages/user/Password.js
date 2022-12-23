import React, { useState } from "react";
import { toast } from "react-toastify";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";

const Password = () => {
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setloading(false);
        setpassword("");
        toast.success("Password update successful!");
      })
      .catch((err) => {
        setloading(false);
        toast.error(err.message);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-3">
          {loading ? (
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <h4 className="my-3">Password Update</h4>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                onChange={(e) => setpassword(e.target.value)}
                className="form-control my-3"
                placeholder="Enter new password"
                disabled={loading}
                value={password}
              />
              <button
                className="btn btn-primary"
                disabled={password.length < 8 || loading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
