import React from "react";
import base from "../baseUrl";
import axios from "axios";
const UserApi = () => {
  async function signIn(data) {
    let EndPoint = `${base}/signup`;
    try {
      const res = await axios.post(EndPoint,data);
      const data = await res.data;
      return data;
    } catch (error) {
      console.log("Error when signing in");
    }
  }

  return {signIn};
};

export default UserApi;
