import axios from "axios";

export const getAllCategories = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/get/category/all`
  );
};
export const getCategory = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/get/category/${slug}`
  );
};
export const saveCategory = async (token, category) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/category/save`,
    category,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
export const removeCategory = async (token, slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}/category/delete/${slug}`,
    { headers: { Authorization: `Bearer ${token}` } },
    {}
  );
};
export const updateCategory = async (token, category) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_API}/category/update`,
    category,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
