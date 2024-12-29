"use client";
import InputForm from "@/components/Forms/Input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { signin } from "@/actions/auth";
import { signInApi } from "@/apiendpoints/userApi";
import ToastContainerLib from "@/lib/ToastContainerLib";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SignIn = () => {
  const { pending } = useFormStatus();
  const router = useRouter();
  const [state, signinAction] = useActionState(signin, undefined);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleOnChange(e: any) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  console.log(formData);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Form Submitted");
    try {
      let res = await signInApi(formData);
      toast.info("Sign In Successful");
      setTimeout(()=>{
        router.push("/dashboard");
      },2000)
    } catch (error) {
      toast.error("Error when calling sign in");
    }
  }

  return (
    <div className="w-full h-96 flex justify-center  items-center">
      <ToastContainerLib />
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle style={{ fontSize: "2rem", textAlign: "center" }}>
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="w-full py-2">
                {" "}
                <InputForm
                value={formData.username}
                  onChange={handleOnChange}
                  id="username"
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="Anil12"
                />
                {/* {state?.errors?.username && (
                  <p className="text-red-500">{state.errors.username}</p>
                )} */}
              </div>
              <div>
                <InputForm
                  value={formData.password}
                  onChange={handleOnChange}
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password!"
                />
                {/* {state?.errors?.password && (
                  <p className="text-red-500">{state.errors.password}</p>
                )} */}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-center gap-2">
            <Button type="submit" disabled={pending}>
              Sign In
            </Button>
            <p>
              Do not have an account?{" "}
              <Link href={"/sign_up"} className="text-blue-500 cursor-pointer underline">Sign Up</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
