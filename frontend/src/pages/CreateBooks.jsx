import React from "react";
import { useState } from "react";
import Spinner from "../components/spinner";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handlesavebook = async (event) => {
    event.preventDefault();
    const data = {
      title,
      author,
      year,
    };
    setLoading(true);
    let result = await fetch("http://localhost:5000/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setLoading(false);
    enqueueSnackbar('Book Created Succesfully', {variant: "success"});
    if(result){
      navigate('/')
    }
  };

  return (
    <div className="p-4 flex flex-col h-screen">
      <BackButton />
      <h1 className="text-4xl font-bold my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-3xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            placeholder="Enter the Title"
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-3xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            placeholder="Enter the Author Name"
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-3xl mr-4 text-gray-500">Year</label>
          <input
            type="text"
            value={year}
            placeholder="Enter the Published Year"
            onChange={(e) => setYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 my-8" onClick={handlesavebook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
