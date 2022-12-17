import React, { useState } from "react";
import {
  HomeOutlined,
  LoginOutlined,
  FormOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
const items = [
  {
    label: "Home",
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Options",
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        label: "Option 1",
        key: "setting:1",
      },
      {
        label: "Option 2",
        key: "setting:2",
      },
    ],
  },
  {
    label: "Login",
    key: "login",
    icon: <LoginOutlined />,
    className: "float-end",
  },
  {
    label: "Register",
    key: "register",
    icon: <FormOutlined />,
    className: "float-end",
  },
];
const Header = () => {
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
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
