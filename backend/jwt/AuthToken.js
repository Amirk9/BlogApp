import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
   // httpOnly: true, // Temporarily set to false for testing
    httpOnly: false, // Set to false for production
    secure: true,
    //sameSite: "lax", 
    sameSite: "none", //set none when we deploy
    path: "/", // Ensure the cookie is available throughout the site
  });
  await User.findByIdAndUpdate(userId, { token });
  return token;
};

export default createTokenAndSaveCookies;
