import React, { useState } from "react";
import {
  HomeOutlined,
  LoginOutlined,
  FormOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  let { user } = useSelector((state) => ({ ...state }));
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  const dispatch = useDispatch();
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  };
  const items = [
    {
      label: "Home",
      key: "/",
      icon: <HomeOutlined />,
    },
    user && {
      label: user.name,
      key: "SubMenu",
      icon: <SettingOutlined />,
      className: "float-end",
      children: [
        {
          label: "Option 1",
          key: "setting:1",
        },
        {
          label: "Option 2",
          key: "setting:2",
        },
        {
          label: "Logout",
          key: "/login",
          icon: <LogoutOutlined />,
          onClick: logout,
        },
      ],
    },
    !user && {
      label: "Register",
      key: "register",
      icon: <FormOutlined />,
      className: "float-end",
    },
    !user && {
      label: "Login",
      key: "login",
      icon: <LoginOutlined />,
      className: "float-end",
    },
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      className="d-block"
    />
  );
};
export default Header;
