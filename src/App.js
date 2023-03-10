import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { getUser } from "./functions/auth";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import Password from "./pages/user/Password";
import WishList from "./pages/user/WishList";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/category/CreateCategory";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import CreateSubCategory from "./pages/admin/sub-category/CreateSubCategory";
import UpdateSubCategory from "./pages/admin/sub-category/UpdateSubCategory";
import CreateProduct from "./pages/admin/product/CreateProduct";
import AllProducts from "./pages/admin/product/AllProducts";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        getUser(idTokenResult)
          .then(async (res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: res.data.email,
                token: idTokenResult.token,
                uid: res.data.uid,
                name: res.data.name,
                picture: res.data.picture,
                emailVerified: res.data.emailVerified,
                role: res.data.role,
              },
            });
          })
          .catch(async (err) => toast.error(err.message));
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/register/complete"
            element={<RegisterComplete />}
          />
          <Route exact path="/forgot/password" element={<ForgotPassword />} />
          <Route element={<UserRoute />}>
            <Route exact path="/user/history" element={<History />} />
            <Route exact path="/user/password" element={<Password />} />
            <Route exact path="/user/wishlist" element={<WishList />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
            <Route exact path="/admin/category" element={<CreateCategory />} />
            <Route
              exact
              path="/admin/category/:slug"
              element={<UpdateCategory />}
            />
            <Route
              exact
              path="/admin/sub-category/:slug"
              element={<UpdateSubCategory />}
            />
            <Route
              exact
              path="/admin/sub-category"
              element={<CreateSubCategory />}
            />
            <Route exact path="/admin/product" element={<CreateProduct />} />
            <Route exact path="/admin/products" element={<AllProducts />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
