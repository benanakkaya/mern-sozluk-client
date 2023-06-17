import React from "react";
import RegisterForm from "./components/RegisterForm";

const Register = () => {
  return (
    <div className="flex flex-col gap-3 p-4">
      <h2 className="text-2xl font-bold">yeni kullanıcı kaydı</h2>
      <RegisterForm />
    </div>
  );
};

export default Register;
