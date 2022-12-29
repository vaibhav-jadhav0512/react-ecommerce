import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/forms/CategoryForm";
import AdminNav from "../../../components/nav/AdminNav";
import { getAllCategories } from "../../../functions/category";
import {
  getSubCategory,
  updateSubCategory,
} from "../../../functions/subCategory";

const UpdateSubCategory = () => {
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const { slug } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setcategories] = useState([]);
  const [category, setcategory] = useState("");
  const [parent, setparent] = useState("");
  const history = useNavigate();
  useEffect(() => {
    const loadCategory = async () => {
      await getAllCategories().then((c) => setcategories(c.data));
      await getSubCategory(slug).then((res) => {
        setname(res.data.name);
        setparent(res.data.parent);
        setcategory(res.data.parent);
      });
    };
    loadCategory();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    updateSubCategory(user.token, { name, slug, parent: category })
      .then(async (res) => {
        setloading(false);
        toast.success("Category updated successfully");
        history("/admin/sub-category");
      })
      .catch((err) => {
        setloading(false);
        toast.error(err.response.data.message);
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
            <h4>Update Sub Category</h4>
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
                  <option
                    key={c.slug}
                    value={c.slug}
                    selected={c.parent === parent}
                  >
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setname={setname}
            cancel={true}
            history={history}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateSubCategory;
