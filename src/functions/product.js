import axios from "axios";

export const saveProduct = async (token, product) => {
  console.log(product);
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/product/save`,
    product,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
