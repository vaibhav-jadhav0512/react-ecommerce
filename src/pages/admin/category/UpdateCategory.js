import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/forms/CategoryForm";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategory, updateCategory } from "../../../functions/category";

const UpdateCategory = () => {
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const { slug } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const history = useNavigate();
  useEffect(() => {
    const loadCategory = async () => {
      await getCategory(slug).then((res) => {
        setname(res.data.name);
      });
    };
    loadCategory();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    updateCategory(user.token, { name, slug })
      .then(async (res) => {
        setloading(false);
        toast.success("Category updated successfully");
        history("/admin/category");
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
            <h4>Update Category</h4>
          )}
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

export default UpdateCategory;
