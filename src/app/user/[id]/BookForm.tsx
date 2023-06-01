"use client";
import { useState } from "react";
import { useBookContext } from "@/app/context/bookstore";
import axios from "axios";
import BookDisplay from "./BookDisplay";

const BookForm = () => {
  const userId = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [setting, setSetting] = useState("");
  const [summary, setSummary] = useState("");
  const bookCtx = useBookContext();

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    axios
      .post("/api/book", { userId, title, setting, summary })
      .then((res) => {
        //@ts-ignore
        bookCtx.setBookList(res.data);
      })
      .catch((err) => console.error(err));

    setTitle("");
    setSetting("");
    setSummary("");
  };

  return bookCtx.currBook ? (
    <BookDisplay />
  ) : (
    <form onSubmit={handleSubmit} className="rounded-md flex flex-col justify-center items-center bg-gray-800 p-2">
      <input
        className="m-2 bg-gray-800 focus:outline-none text-white p-1 border-b"
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        className="m-2 bg-gray-800 focus:outline-none text-white p-1 border-b"
        name="setting"
        placeholder="setting"
        value={setting}
        onChange={(e) => setSetting(e.target.value)}
      ></input>
      <textarea
        className="m-4 bg-gray-800 focus:outline-none text-white border rounded p-1"
        name="summary"
        placeholder="summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      ></textarea>
      <input className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md w-[11vw] cursor-pointer" type="submit" value="add book"></input>
    </form>
  );
};

export default BookForm;
