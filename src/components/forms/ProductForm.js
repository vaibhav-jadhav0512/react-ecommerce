import React from "react";

const ProductForm = ({ handleSubmit, handleChange, values }) => {
  const {
    title,
    description,
    price,
    shipping,
    quantity,
    colour,
    brand,
    colours,
    brands,
  } = values;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control my-2"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          className="form-control my-2"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          className="form-control my-2"
          value={price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="shipping">Shipping</label>
        <select
          name="shipping"
          className="form-select my-2"
          onChange={handleChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          className="form-control my-2"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="colour">Colour</label>
        <select
          name="colour"
          className="form-select my-2"
          onChange={handleChange}
        >
          <option>Select colour</option>
          {colours.map((c) => {
            return (
              <option key={c} value={c}>
                {c}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="colour">Brand</label>
        <select
          name="brand"
          className="form-select my-2"
          onChange={handleChange}
        >
          <option>Select brand</option>
          {brands.map((c) => {
            return (
              <option key={c} value={c}>
                {c}
              </option>
            );
          })}
        </select>
      </div>
      <button className="btn btn-outline-info my-2" type="submit">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
