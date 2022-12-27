import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import {
  getAllCategories,
  removeCategory,
  saveCategory,
} from "../../../functions/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { searched } from "../../../functions/search";

const CreateCategory = () => {
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const [categories, setcategories] = useState([]);
  const [keyword, setkeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getAllCategories().then((c) => setcategories(c.data));
  };
  const handleDelete = async (slug) => {
    if (window.confirm("Delete category?")) {
      setloading(true);
      removeCategory(user.token, slug)
        .then((res) => {
          toast.success("Category deleted successfully!");
          const updatedCategories = categories.filter((cat) => {
            return cat.slug !== slug;
          });
          setcategories(updatedCategories);
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
    saveCategory(user.token, { name })
      .then(async (res) => {
        setcategories(categories.concat(res.data).reverse());
        setloading(false);
        setname("");
        toast.success("Category added successfully");
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
            <h4>Create Category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setname={setname}
          />
          <LocalSearch keyword={keyword} setkeyword={setkeyword} />
          <div className="row">
            {categories.filter(searched(keyword)).map((c) => (
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
                  <Link to={`/admin/category/${c.slug}`}>
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

export default CreateCategory;
