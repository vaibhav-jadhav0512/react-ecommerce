import React from "react";

const CategoryForm = ({ handleSubmit, name, setname, cancel, history }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control my-2"
          id="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          autoFocus
          required
          minLength={3}
        />
        {!cancel ? (
          <button className="btn btn-outline-primary my-2" type="submit">
            Create
          </button>
        ) : (
          <button className="btn btn-outline-primary my-2" type="submit">
            Update
          </button>
        )}
        {cancel && (
          <button
            className="btn btn-outline-warning my-2 mx-2"
            onClick={() => {
              !cancel
                ? history("/admin/category")
                : history("/admin/sub-category");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
