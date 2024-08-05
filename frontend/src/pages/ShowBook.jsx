import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const showData = async () => {
      setLoading(true);
      setError(null); // Reset any previous error
      try {
        const response = await fetch(`http://localhost:5000/book/${id}`);
        console.log(response);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Expected JSON response but got HTML/other.");
        }
        const result = await response.json();
        setBook(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    showData();
  }, [id]);

  return (
    <div className="p-4 flex flex-col h-screen">
      <BackButton />
      <h1 className="text-4xl font-bold my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Year</span>
            <span>{book.year}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{book.createTime}</span>
            {/* <span>{new Date(book.createdAt).toString()}</span> */}
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Last Updated Time
            </span>
            {/* <span>{new Date(book.updatedAt).toString()}</span> */}
            <span>{book.updateTime}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
