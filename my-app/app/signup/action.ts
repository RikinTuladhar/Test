import { redirect } from "next/dist/server/api-utils";
import { z } from "zod";

const testUser = {
    id:"1",
    username:"admin@gmail.com",
    password:"admin",
}

const signupSchema = z.object({
    username:z.string().regex(/^[^\s0-9]+$/,{message:"Invalid username"}).min(3,{message:"Username must be atleastt 3 characters long"}).trim(),
    password:z.string().min(6,{message:"Password must be atleast 6 characters long"}).trim(),
})

export async function signup(prevState:any,formData:FormData){
    const result = signupSchema.safeParse(Object.fromEntries(formData));

    if(!result.success){
        return {
            errors:result.error.flatten().fieldErrors,
        }
    }

    const {username,password} = result.data;

    if(username === testUser.username || password === testUser.password){
        return {
            errors:{
                username:["Username already exists"]
            }
        }
    }
    
    return "helo"

}