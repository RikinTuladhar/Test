"use client";
import ToastContainerLib from "@/lib/ToastContainerLib";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircleUserRound } from "lucide-react";
import { Eye } from 'lucide-react';
import { Trash } from 'lucide-react';
interface UploadedFile {
  id: string;
  userId: string;
  uploadDate: string;
  storedFilename: string;
  originalFilename: string;
  view: number;
}

const Page = () => {
  const router = useRouter();
  const [files, setFiles] = useState<UploadedFile[]>([
  ]);
  const [token, setToken] = useState("");
  const [filename, setFilename] = useState("");
  const [image, setImage] = useState<File | null>(null);


  useEffect(() => {
    if (token) {
      (async () => {
        const res = await axios.get(
          "https://interview-mock-api.onrender.com/uploads",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const res_data = await res?.data.uploads
        setFiles(res_data);
      })();
    }
  }, [token]);



  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "https://interview-mock-api.onrender.com/upload",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success(res?.data.message);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Error uploading file");
    }
  };

  function handleLogout() {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div className="w-full min-h-screen px-28 py-10 ">
      <ToastContainerLib />
      <div className="w-full flex justify-between items-center ">
        <h1 className="text-5xl py-10">File Management System</h1>
        <div className="cursor-pointer" onClick={handleLogout}>
          {" "}
          <CircleUserRound size={30} />
        </div>
      </div>
      <div className="w-full px-5 bg-slate-200 py-4 rounded-lg shadow-xl min-h-20">
        <form>
          <div className="flex items-center justify-between">
            <div className="w-full flex flex-col">
              <label className="font-bold" htmlFor="filename">
                File Name
              </label>
              <input
              disabled
                type="text"
                id="filename"
                placeholder="Filename"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
              />
            </div>
            <div>
              <input
                type="file"
                id="fileInput"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleFileUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="p-4">
        <div className="py-4">
          <h1 className="text-5xl">Uploaded Files</h1>
        </div>
        <table className="w-full shadow-xl rounded-md  text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Filename</th>
              <th className="px-4 py-2">View</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.originalFilename} className="border-b border-gray-200">
                <td className="px-4 py-2">{file.originalFilename}</td>
                <td className="px-4 py-2">  <Eye /></td>
                <td className="px-4 py-2">
                <Trash />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
