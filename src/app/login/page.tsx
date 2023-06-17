import React from "react";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col gap-3 p-4">
      <h2 className="text-2xl font-bold">giriş</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
