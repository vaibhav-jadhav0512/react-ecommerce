import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <div>
      <nav>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/user/history">History</Link>
          </li>
          <li className="nav-item">
            <Link to="/user/password">Update Password</Link>
          </li>
          <li className="nav-item">
            <Link to="/user/wishlist">WishList</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserNav;
