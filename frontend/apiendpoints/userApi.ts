import axios from "axios";

export async function signInApi(params: UserType) {
  const endpoint = "https://interview-mock-api.onrender.com/login";
  try {
    const res = await axios.post(endpoint, params);
    const res_data = await res.data.token;
    if(res_data){
        localStorage.setItem("token", res_data);
        return true;
    }
    return false;
    
  } catch (error) {
    console.log(error);
    throw new Error("Error when calling sign in api");
  }
}

export async function signUpApi(params: UserType) {
  const endpoint = "https://interview-mock-api.onrender.com/signup";
  try {
    const res = await axios.post(endpoint, params);
    const res_data = await res.data.message;
    return res_data;
  } catch (error) {
    console.log(error);
    throw new Error("Error when calling sign up api");
  }
}
