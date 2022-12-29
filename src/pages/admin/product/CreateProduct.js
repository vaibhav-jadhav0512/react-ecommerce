import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductForm from "../../../components/forms/ProductForm";
import AdminNav from "../../../components/nav/AdminNav";
import { saveProduct } from "../../../functions/product";

const CreateProduct = () => {
  const value = {
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
  };
  const [values, setvalues] = useState(value);
  const { user } = useSelector((state) => ({ ...state }));
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveProduct(user.token, values)
      .then((res) => {
        console.log(res.data);
        toast.success(`Product "${res.data.title}" is created`);
        setvalues(value);
      })
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
          <ProductForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
