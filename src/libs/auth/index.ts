import { jwtVerify } from "jose";

export const verifyJwtToken = async (token: string) => {
  try {
    const payload = await jwtVerify(token, new TextEncoder().encode("SECRET_KEY"));
    return payload;
  } catch (error) {
    return null;
  }
};
