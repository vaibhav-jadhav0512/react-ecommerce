import React from "react";
import UserNav from "../../components/nav/UserNav";

const WishList = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">WishList</div>
      </div>
    </div>
  );
};

export default WishList;
