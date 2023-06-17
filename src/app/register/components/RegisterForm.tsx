"use client"
import React, { useState } from "react";
import { useFormik } from "formik";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from 'next/navigation'

interface FormValues {
  username: string;
  email: string;
  password: string;
  password2: string;
  birthday: string;
  gender: string;
}

const RegisterForm: React.FC = () => {

  const [registerStatus, setRegisterStatus] = useState("idle");
  const router = useRouter();


  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
      birthday: "",
      gender: "boşver",
    },
    onSubmit: async (values) => {
      setRegisterStatus("pending");
      try {
        const res = await axios.post("http://localhost:5000/user/register", values);
        router.push("/")
        toast.success(res.data.message);
        setRegisterStatus("ready");
      } catch (err:any) {
        setRegisterStatus("idle");
        toast.error(err.response.data.message);
      }
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("bir nick'in olmalı!").min(3, "nick'in minimum 3 karakterden oluşmalı!").max(15, "nick'in çok uzun, max 15 karakter!"),
      email: yup.string().required("bir e-mail adresin olmalı!").email("böyle e-mail olmaz olsun!"),
      password: yup.string().required("şifren olmadan nasıl giriş yapacaksın?").min(5, "şifren çok kısa, minimum 5 karakter olmalı!").max(20, "parolan çok fazla uzun, max 20 karakter!"),
      password2: yup.string().required("şifreni doğrula!").oneOf([yup.ref("password")], "bir dediğin diğerini tutmuyor!"),
      birthday: yup.date().typeError("maya takvimi mi bu?").required("senin yaşın kaç?"),
      gender: yup.string(),
    }),
  });

  const handleGender = (gender: string) => {
    formik.setFieldValue("gender", gender);
  };


  return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            nick:
            <input name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="bg-customGray outline-none rounded-md px-2 py-1" />
            {formik.errors.username && formik.touched.username ? (
              <span className="text-red-500 text-xs">{formik.errors.username}</span>
            ) : null}
          </label>
          <label className="flex flex-col gap-1">
            e-mail:
            <input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="bg-customGray outline-none rounded-md px-2 py-1" />
            {formik.errors.email && formik.touched.email ? (
              <span className="text-red-500 text-xs">{formik.errors.email}</span>
            ) : null}
          </label>
          <label className="flex flex-col gap-1">
            doğum tarihi:
            <input name="birthday" onChange={formik.handleChange} onBlur={formik.handleBlur} type="date" className="bg-customGray outline-none rounded-md px-2 py-1" />
            {formik.errors.birthday && formik.touched.birthday ? (
              <span className="text-red-500 text-xs">{formik.errors.birthday}</span>
            ) : null}
          </label>
          <div className="flex flex-col gap-1">
            cinsiyetiniz:
            <div className="flex rounded-md border-[1px] border-customGray">
              <button type="button" onClick={() => handleGender("kadın")} className={`flex-1 px-2 py-1 hover:bg-primary hover:text-white rounded-l-md border-r-[1px] border-customGray ${formik.values.gender === "kadın" && 'bg-primary text-white'} `}>
                kadın
              </button>
              <button type="button" onClick={() => handleGender("erkek")} className={`flex-1 px-2 py-1 hover:bg-primary hover:text-white border-r-[1px] border-customGray ${formik.values.gender === "erkek" && 'bg-primary text-white'} `}>
                erkek
              </button>
              <button type="button" onClick={() => handleGender("başka")} className={`flex-1 px-2 py-1 hover:bg-primary hover:text-white border-r-[1px] border-customGray ${formik.values.gender === "başka" && 'bg-primary text-white'} `}>
                başka
              </button>
              <button type="button" onClick={() => handleGender("boşver")} className={`flex-1 px-2 py-1 hover:bg-primary hover:text-white rounded-r-md  border-customGray ${formik.values.gender === "boşver" && 'bg-primary text-white'} `}>
                boşver
              </button>
            </div>
          </div>
          <label className="flex flex-col gap-1">
            şifre:
            <input name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className="bg-customGray outline-none rounded-md px-2 py-1" />
            {formik.errors.password && formik.touched.password ? (
              <span className="text-red-500 text-xs">{formik.errors.password}</span>
            ) : null}
          </label>
          <label className="flex flex-col gap-1">
            şifre (tekrar):
            <input name="password2" onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className="bg-customGray outline-none rounded-md px-2 py-1" />
            {formik.errors.password2 && formik.touched.password2 ? (
              <span className="text-red-500 text-xs">{formik.errors.password2}</span>
            ) : null}
          </label>

          <button disabled={registerStatus === "pending"} type="submit" className="bg-primary text-white rounded-md px-2 py-1 flex items-center justify-center">
            {registerStatus === "pending" ? (
              <div className="flex items-center gap-2 ">
                <AiOutlineLoading3Quarters className="animate-spin duration-500" />
                kayıt tamamlanıyor...
              </div>
            ) : (
              "kaydı tamamla"
            )}
          </button>
        </form>
  );
};

export default RegisterForm;
