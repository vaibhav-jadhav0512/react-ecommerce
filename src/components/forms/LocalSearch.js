import React from "react";

const LocalSearch = ({ keyword, setkeyword }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setkeyword(e.target.value.toLowerCase());
  };
  return (
    <div className="col-md-4">
      <input
        type="search"
        className="form-control my-3"
        placeholder="Filter categories..."
        value={keyword}
        onChange={handleSearch}
      />
    </div>
  );
};

export default LocalSearch;
