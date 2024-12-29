import React from "react";
import base from "../baseUrl";
import axios from "axios";
const UserApi = () => {
  async function signIn(data) {
    let EndPoint = `${base}/signup`;
    console.log(EndPoint);
    try {
      const res = await axios.post("https://interview-mock-api.onrender.com/signup", data);
      const message = await res?.data.message;
      console.log(message);
      return message;
    } catch (error) {
      let errorMessage = error.response.data.message || "Error when signing up";
      throw new Error(errorMessage);
    }
  }

  async function logIn() {
    try {
      const res = await axios.post(
        "https://interview-mock-api.onrender.com/login",
        data
      );
      const token = await res?.data.token;
      localStorage.setItem("token", JSON.stringify(token));
      return token;
    } catch (error) {
      throw new error.response.data.message;
      console.log("Error when signing in", error);
    }
  }

  return { signIn, logIn };
};

export default UserApi;
