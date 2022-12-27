import axios from "axios";

export const getAllSubCategories = async () => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/get/sub-category/all`
  );
};
export const getSubCategory = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/get/sub-category/${slug}`
  );
};
export const saveSubCategory = async (token, subCategory) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/sub-category/save`,
    subCategory,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
export const removeSubCategory = async (token, slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}/sub-category/delete/${slug}`,
    { headers: { Authorization: `Bearer ${token}` } },
    {}
  );
};
export const updateSubCategory = async (token, subCategory) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_API}/sub-category/update`,
    subCategory,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
