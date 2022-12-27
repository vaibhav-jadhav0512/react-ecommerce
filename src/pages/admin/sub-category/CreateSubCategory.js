import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { searched } from "../../../functions/search";
import {
  getAllSubCategories,
  removeSubCategory,
  saveSubCategory,
} from "../../../functions/subCategory";
import { getAllCategories } from "../../../functions/category";

const CreateSubCategory = () => {
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const [categories, setcategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);
  const [category, setcategory] = useState("");
  const [keyword, setkeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getAllCategories().then((c) => setcategories(c.data));
    getAllSubCategories().then((c) => setsubcategories(c.data));
  };
  const handleDelete = async (slug) => {
    if (window.confirm("Delete sub category?")) {
      setloading(true);
      removeSubCategory(user.token, slug)
        .then((res) => {
          toast.success("Sub Category deleted successfully!");
          const updatedCategories = subcategories.filter((cat) => {
            return cat.slug !== slug;
          });
          setsubcategories(updatedCategories);
          setloading(false);
        })
        .catch((err) => {
          toast.error(err.message);
          setloading(false);
        });
    } else {
      setloading(false);
      return;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (category === "") {
      alert("Please select category");
      return;
    }
    saveSubCategory(user.token, { name, parent: category })
      .then(async (res) => {
        setsubcategories(subcategories.concat(res.data).reverse());
        setloading(false);
        setname("");
        toast.success("Sub Category added successfully");
        setcategory("");
      })
      .catch((err) => {
        setloading(false);
        err.response.status === 409
          ? toast.error(`Category "${name}" already exists!`)
          : toast.error(err.response.data.message);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-6 my-3">
          {loading ? (
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <h4>Create Sub Category</h4>
          )}
          <div className="form-group">
            <label className="my-2" htmlFor="category">
              Parent Category
            </label>
            <select
              className="form-select my-2"
              name="category"
              id="category"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
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
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setname={setname}
          />
          <LocalSearch keyword={keyword} setkeyword={setkeyword} />
          <div className="row">
            {subcategories.filter(searched(keyword)).map((c) => (
              <div className="alert alert-secondary" key={c.slug}>
                {c.name}
                <span
                  className="btn btn-sm float-end"
                  onClick={() => {
                    handleDelete(c.slug);
                  }}
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <span className="btn btn-sm float-end">
                  <Link to={`/admin/sub-category/${c.slug}`}>
                    <EditOutlined className="text-warning" />
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubCategory;
