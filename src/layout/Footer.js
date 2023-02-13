import React from "react";

function Footer() {
  return (
    <footer className="font-primary">
      <div className="bg-footer py-4 flex justify-between items-center max-w-[1170px] m-auto">
        <div className="flex basis-1/3 flex-col pr-6">
          <img
            className="w-[210px] mb-8"
            src={require("./../asset/image/logo.png")}
            alt=""
          />
          <div className="mb-5">
            <p>
              <span className="uppercase text-[#0c0c0c] text-sm font-primary font-bold">
                Address:{" "}
              </span>
              <span className="capitalize font-normal">
                28 White tower, Street Name New York City, USA
              </span>
            </p>
          </div>

          <div className="mb-5">
            <p>
              <span className="uppercase text-[#0c0c0c] text-sm font-primary font-bold">
                TELEPHONE:{" "}
              </span>
              <span className="capitalize font-normal">+91 987 654 3210</span>
            </p>
          </div>

          <div className="mb-5">
            <p>
              <span className="uppercase text-[#0c0c0c] text-sm font-primary font-bold">
                EMAIL:{" "}
              </span>
              <span className="capitalize font-normal">yourmain@gmail.com</span>
            </p>
          </div>
        </div>

        <div className="basis-2/3 flex flex-row justify-end">
          <div className="w-[30%]">
            <h2 className="uppercase text-lg font-bold mb-6">Menu</h2>
            <ul>
              <li className="capitalize text-base font-light mt-1 cursor-pointer">
                Home
              </li>
              <li className="capitalize text-base font-light mt-1 cursor-pointer">
                About
              </li>
              <li className="capitalize text-base font-light mt-1 cursor-pointer">
                Services
              </li>
              <li className="capitalize text-base font-light mt-1 cursor-pointer">
                Testimonial
              </li>
              <li className="capitalize text-base font-light mt-1 cursor-pointer">
                Blog
              </li>
              <li className="capitalize text-base font-light mt-1 cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          <div className="w-[30%]">
            <h2 className="uppercase text-lg font-bold mb-6">Acount</h2>
            <ul>
              <li className="capitalize text-base font-light mt-1 cursor-pointer">
                Acount
              </li>
              <li className="capitalize text-base font-light mt-1 cursor-pointer">
                Checkout
              </li>
              <li className="capitalize text-base font-light mt-1 cursor-pointer">
                Login
              </li>
              <li className="capitalize text-base font-light mt-1 cursor-pointer">
                Register
              </li>
              <li className="capitalize text-base font-light mt-1 cursor-pointer">
                Shopping
              </li>
              <li className="capitalize text-base font-light mt-1 cursor-pointer">
                Widget
              </li>
            </ul>
          </div>
          <div className="w-[30%]">
            <h2 className="uppercase text-lg font-bold mb-6">Newsletter</h2>
            <p>Subscribe by our newsletter and get update protidin.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
