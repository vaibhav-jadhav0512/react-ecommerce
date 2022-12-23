import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <div>
      <nav>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/user/history" className="nav-link">
              History
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/password" className="nav-link">
              Update Password
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/wishlist" className="nav-link">
              WishList
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserNav;
