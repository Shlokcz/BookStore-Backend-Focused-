import React, { useState } from "react";
import Spinner from "../components/spinner";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {enqueueSnackbar} = useSnackbar();

  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  const handleDelete = async () => {
    setLoading(true);
    setError(null); // Reset any previous error
    try {
      const response = await fetch(`http://localhost:5000/delete/${id.substring(1)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      // console.log(result);
      if (result.acknowledged) {
        enqueueSnackbar("Book Deleted Sucessfully", {variant: "sucess"});
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting data", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async () => {
  //   // setLoading(true);
  //   let result = await fetch(`http://localhost:5000/delete/${id}`);
  //   console.log(id);
  //   result = await result.json();
  //   // setLoading(false);
  //   navigate("/");
  // };

  return (
    <div className="p-4 flex flex-col h-screen">
      <BackButton />
      <h1 className="text-4xl font-bold my-4">Delete Book</h1>
      {loading ? <Spinner /> : " "}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl ">
          Are you sure you want to delete this book?
        </h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDelete}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
