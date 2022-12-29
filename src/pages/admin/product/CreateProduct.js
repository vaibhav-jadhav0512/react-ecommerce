import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import { saveProduct } from "../../../functions/product";

const CreateProduct = () => {
  const [values, setvalues] = useState({
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "refactoring",
    subCategories: [],
    subCategory: "test",
    shipping: "",
    quantity: "",
    images: [],
    colours: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    colour: "",
    brand: "",
  });
  const {
    title,
    description,
    price,
    category,
    categories,
    subCategories,
    subCategory,
    shipping,
    quantity,
    images,
    colours,
    brands,
    colour,
    brand,
  } = values;
  const { user } = useSelector((state) => ({ ...state }));
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveProduct(user.token, values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-3">
          <h4 className="my-3">Create Product</h4>
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
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
