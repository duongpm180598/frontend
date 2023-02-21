import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../Recoil/actions/auth.actions";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  // const [actionStatus, setActionStatus] = useState({login: true,});
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This Field is required").email(),
    password: Yup.string().required("This Field is required"),
  });

  const handleChange = (values) => {
    authActions()
      .login(values)
      .then((res) => {
        if (res) {
          navigate("/");
        }
      })
      .catch((e) => {
        setMessage(e);
      });
  };
  return (
    <Formik
      initialValues={form}
      enableReinitialize="true"
      onSubmit={(values) => {
        handleChange(values);
      }}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-10 p-8 flex">
          <div className="basis-1/2">
            <img
              className="w-[500px] h-[500px]"
              src={require("../../asset/image/bg-login.png")}
              alt=""
            />
          </div>
          <Form className="w-[400px] min-h-[300px] border-2 m-auto p-8 relative">
            <div className="flex justify-between mb-4">
              <label
                className={
                  errors.email && touched.email
                    ? "font-semibold tracking-wider text-active"
                    : "font-semibold tracking-wider"
                }
              >
                *Username:
              </label>
              <div>
                <Field
                  onChange={(e) => {
                    setForm({ ...form, [e.target.name]: e.target.value });
                  }}
                  value={form.email}
                  className={
                    errors.email && touched.email
                      ? "border-2 p-2 rounded-md border-active"
                      : "border-2 p-2 rounded-md"
                  }
                  name="email"
                  placeholder="Enter Your Email"
                />
                {errors.email && touched.email ? (
                  <div className="text-sm tracking-wider font-normal text-active">
                    {errors.email}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex justify-between">
              <label
                className={
                  errors.password && touched.password
                    ? "font-semibold tracking-wider text-active"
                    : "font-semibold tracking-wider"
                }
              >
                *Password
              </label>
              <div>
                <Field
                  type="password"
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                  className={
                    errors.password && touched.password
                      ? "border-2 p-2 rounded-md border-active"
                      : "border-2 p-2 rounded-md"
                  }
                  value={form.password}
                  name="password"
                  placeholder="Enter Your password"
                />
                {errors.password && touched.password ? (
                  <div className="text-sm tracking-wider font-normal text-active">
                    {errors.password}
                  </div>
                ) : null}
              </div>
            </div>
            {message ? (
              <p className="mt-5 text-sm tracking-wide text-active text-center">
                {message}
              </p>
            ) : null}

            <div className="absolute bottom-1 left-0 flex flex-col  w-full px-8">
              <button
                className="px-4 py-2 bg-active rounded text-white"
                type="submit"
              >
                Login
              </button>
              <p className="mt-2">
                Not Registed?{" "}
                <span
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="text-blue-800 font-semibold cursor-pointer"
                >
                  create an account
                </span>
              </p>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Login;
// beyondthelimits;
