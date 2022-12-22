import axios from "axios";

export const createOrUpdateUser = async (idTokenResult) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/create-update`,
    {},
    { headers: { Authorization: `Bearer ${idTokenResult.token}` } }
  );
};

export const getUser = async (idTokenResult) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/get/user/email`,
    {},
    { headers: { Authorization: `Bearer ${idTokenResult.token}` } }
  );
};