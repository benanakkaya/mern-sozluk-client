"use client";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLoggedUser, setLoginned } from "@/redux/User/UserSlice";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoginForm = () => {

  const [loginStatus, setLoginStatus] = useState<string>("idle");

  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoginStatus("pending");
      axios
        .post("https://mern-sozluk-backend.onrender.com/user/login", values)
        .then(async (res) => {
          dispatch(setLoginned(true));
          dispatch(setLoggedUser(res.data.user));
          toast.success(res.data.message);
          router.push("/");
          cookie.set("token", res.data.token);
          setLoginStatus("idle");
        })
        .catch((err) => {
          setLoginStatus("idle");
          toast.error(err.response.data.message);
        });
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Lütfen geçerli bir e-mail gir!")
        .required("e-mailin olmadan nasıl giriş yapacaksın?"),
      password: yup.string().required("lütfen parolanı gir!"),
    }),
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <label className="relative flex flex-col gap-1">
          e-mail:
          <input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="isim@mail.com"
            className="bg-customGray outline-none rounded-md px-2 py-1"
          />
          {formik.errors.email && formik.touched.email ? (
            <span className="absolute top-full mt-1 text-red-500 text-xs">{formik.errors.email}</span>
          ) : null}
        </label>
        <label className="relative flex flex-col gap-1">
          şifre:
          <input
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            placeholder="●●●●●●"
            className="bg-customGray outline-none rounded-md px-2 py-1"
          />
          {formik.errors.password && formik.touched.password ? (
            <span className="absolute top-full mt-1 text-red-500 text-xs">
              {formik.errors.password}
            </span>
          ) : null}
        </label>
        <button
          disabled={loginStatus === "pending"}
          type="submit"
          className="bg-primary text-white rounded-md px-2 py-1 flex items-center justify-center"
        >
          {loginStatus === "pending" ? (
            <div className="flex items-center gap-2 ">
              <AiOutlineLoading3Quarters className="animate-spin duration-500" />
              giriş yapılıyor...
            </div>
          ) : (
            "giriş yap"
          )}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
