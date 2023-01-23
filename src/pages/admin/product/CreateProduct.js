import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductForm from "../../../components/forms/ProductForm";
import AdminNav from "../../../components/nav/AdminNav";
import {
  getAllCategories,
  getSubCategoriesParent,
} from "../../../functions/category";
import { saveProduct } from "../../../functions/product";
import FileUpload from "../../../components/forms/FileUpload";
import Loading3QuartersOutlined from "@ant-design/icons/Loading3QuartersOutlined";

const CreateProduct = () => {
  const value = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subCategoriesStr: [],
    subCategory: "",
    shipping: "",
    quantity: "",
    images: [],
    colours: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    colour: "",
    brand: "",
  };
  const [values, setvalues] = useState(value);
  const [subOptions, setsubOptions] = useState([]);
  const [showsub, setshowsub] = useState(false);
  const [loading, setloading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getAllCategories().then((c) =>
      setvalues({ ...values, categories: c.data })
    );
  };

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setvalues({ ...values, subCategoriesStr: [], category: e.target.value });
    getSubCategoriesParent(e.target.value).then((res) =>
      setsubOptions(res.data)
    );
    setshowsub(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    saveProduct(user.token, values)
      .then((res) => {
        toast.success(`Product "${res.data.title}" is created`);
        setvalues(value);
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4 className="my-3">Create Product</h4>
          {loading && (
            <Loading3QuartersOutlined spin={true} className="h1 text-primary" />
          )}
          <div className="p-3">
            <FileUpload
              values={values}
              setvalues={setvalues}
              setloading={setloading}
            />
          </div>
          <div className="col-md-3">
            <ProductForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              handleCategoryChange={handleCategoryChange}
              subOptions={subOptions}
              showsub={showsub}
              setvalues={setvalues}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
