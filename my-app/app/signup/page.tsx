import { Button } from "@/components/ui/button";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = () => {
    



  return (
    <div className="center-container">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="heading2 center ">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid w-full items-center gap-2">
                <label htmlFor="name" className="font-bold">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="John Doe"
                    className="input border-2 rounded-md px-2 py-1"
                    
                />
            </div>
            <div className="grid w-full items-center gap-2">
                <label htmlFor="name" className="font-bold">Password</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Password!"
                    className="input border-2 rounded-md px-2 py-1"
                    
                />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex  justify-center items-center">
          <Button className="bg-background hover:bg-black">Sign Up</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
