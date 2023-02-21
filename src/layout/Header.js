import React, { useState } from "react";
import "./header.css";

import { NavLink } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
// import Login from "../components/login/Login";
function Header() {
  const components = [
    { name: "home", link: "/" },
    { name: "page", link: "/page" },
    { name: "products", link: "/products" },
    { name: "blog", link: "/blog" },
    { name: "contact", link: "/contact" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header>
      <div className="max-w-[1170px] m-auto py-4 flex justify-between items-center">
        <img
          className="w-[250px]"
          src={require("./../asset/image/logo.png")}
          alt="#picture_error"
        />
        <div className="flex justify-end items-center">
          <ul>
            {components.map((item, index) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
                key={index}
                to={item.link}
              >
                {item.name}
              </NavLink>
            ))}
          </ul>
          <div></div>
          <ShoppingCartOutlined className="hover:text-active hover:duration-500 hover:cursor-pointer text-xl" />
          <UserOutlined
            onClick={() => setIsModalOpen(true)}
            className="mx-4 text-xl"
          />
          {/* <Login isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
