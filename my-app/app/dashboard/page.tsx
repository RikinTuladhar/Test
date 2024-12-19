"use client";
import axios from "axios";
import React, { useState } from "react";

const page = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("image", image);
    axios
      .post("https://interview-mock-api.onrender.com/upload", formData)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => console.log("Error when uploading file", err));
  };

  return (
    <div className="w-full flex justify-center items-center py-10 px-10 min-h-screen bg-green-300">
      <div className="w-[80%] min-h-[30rem] bg-red-500 py-10">
        <h1>File Management System</h1>
        {/* <div>
          <label htmlFor="name">File Name</label>
          <input type="text" name="file" id="file" />
        </div> */}
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Upload File</label>
            <input
              type="file"
              name="file"
              onChange={(e) => setImage(e.target.files[0])}
              id="file"
            />
            <button type="Submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
