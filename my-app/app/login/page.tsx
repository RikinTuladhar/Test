"use client";
import User from "@/types/User";
import axios from "axios";
import { loadComponents } from "next/dist/server/load-components";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [data, setData] = useState<User>({
    username: "",
    password: "",
  });
  console.log(data);

  const router = useRouter();

  // const { signIn } = UserApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = data;
    if (username.length < 0 || password.length < 0) {
      alert("username and password cannot be empty");
      return;
    }
    try {
      const res = await axios.post(
        "https://interview-mock-api.onrender.com/login",
        data
      );
      const token = await res?.data.token;
      localStorage.setItem("token", JSON.stringify(token));
      router.push("/dashboard");
    } catch (error) {
      console.log("Error when signing in", error);
    }
  };
  return (
    <div className="w-full text-black h-screen space-y-10 flex-col flex justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="w-[400px] flex py-10 flex-col  bg-red-300">
          <div>
            {" "}
            <h1 className="text-3xl text-center">LOGIN</h1>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col px-5 w-[90%]">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="username"
                id="username"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>
            <div className="flex px-5 flex-col w-[90%]">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="w-[400px] flex py-5 flex-col  bg-red-300">
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default page;
