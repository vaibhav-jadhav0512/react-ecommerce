import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  subOptions,
  showsub,
  setvalues,
}) => {
  const {
    title,
    description,
    price,
    shipping,
    subCategoriesStr,
    quantity,
    colour,
    brand,
    colours,
    brands,
    categories,
    category,
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
      <div className="form-group">
        <label className="my-2" htmlFor="category">
          Parent Category
        </label>
        <select
          className="form-select my-2"
          name="category"
          id="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">--SELECT--</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {showsub && (
        <div>
          <label htmlFor="subcategories">Sub Category</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subCategoriesStr}
            onChange={(value) =>
              setvalues({ ...values, subCategoriesStr: value })
            }
          >
            {subOptions.length > 0 &&
              subOptions.map((s) => (
                <Option key={s.slug} value={s.slug}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
      <button className="btn btn-outline-info my-2" type="submit">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
