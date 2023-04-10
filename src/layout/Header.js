import React, { useState } from "react";
import "./header.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NavLink } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { isAdmin } from "../Services/auth.service";
import { authActions } from "../auth/auth.action";
import { useNavigate } from "react-router-dom";

// import Login from "../components/login/Login";
function Header() {
  const role = isAdmin();
  const navigate = useNavigate();
  const components = [
    { name: "home", link: "/" },
    // { name: "page", link: "/page" },
    // { name: "products", link: "/products" },
    // { name: "blog", link: "/blog" },
    { name: "contact", link: "/contact" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = () => {
    authActions()
      .logout()
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((e) => {
        console.log("called in header: ", e);
      });
  };
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
            {role == "ADMIN" ? (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
                to="manager"
              >
                manager
              </NavLink>
            ) : null}
          </ul>
          <div></div>
          <ShoppingCartOutlined className="hover:text-active hover:duration-500 hover:cursor-pointer text-xl" />
          <div
            className="relative cursor-pointer"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <UserOutlined className="ml-4 text-xl" />
            <ArrowDropDownIcon className="cursor-pointer" />
            {isModalOpen ? (
              <div
                onClick={handleLogout}
                className="absolute cursor-pointer mt-2 p-2 border border-[#333]"
              >
                Logout
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
