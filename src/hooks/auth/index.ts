import { verifyJwtToken } from "@/libs/auth";
import Cookies from "universal-cookie";

const fromServer = async () => {
  const cookies = require("next/headers").cookies;
  const cookieList = cookies();

  const { value: token } = cookieList.get("token") ?? { value: null };

  const verifyToken = await verifyJwtToken(token);

  if (!verifyToken) {
    return {loginStatus: false, user: {id:"",username:""}};
  }
  return {loginStatus: true,user: {id: verifyToken.payload.id,username: verifyToken.payload.username}};
};

export const useAuth = async () => {
  const getVerifiedToken = async () => {
    const cookies = new Cookies();

    const token = cookies.get("token") ?? null;

    const verifyToken = await verifyJwtToken(token);

    return verifyToken;
  };

  if (await getVerifiedToken()) {
    return true;
  } else {
    return false;
  }
};

useAuth.fromServer = fromServer;
