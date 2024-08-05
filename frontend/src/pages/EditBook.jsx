import React from "react";
import { useState, useEffect } from "react";
import Spinner from "../components/spinner";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  // console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    getBookDetails();
  }, []);

  const getBookDetails = async () => {
    let result = await fetch(`http://localhost:5000/book/${id}`);
    result = await result.json();
    setTitle(result.title);
    setAuthor(result.author);
    setYear(result.year);
  };

  const handleUpdateBook = async () => {
    // setLoading(true);
    let result = await fetch(`http://localhost:5000/update/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, author, year }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    enqueueSnackbar("Book Updated Sucessfully", {variant: "success"})
    navigate("/");
  };

  return (
    <div className="p-4 flex flex-col h-screen">
      <BackButton />
      <h1 className="text-4xl font-bold my-4">Update Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-3xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-3xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-3xl mr-4 text-gray-500">Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 my-8" onClick={handleUpdateBook}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditBook;
