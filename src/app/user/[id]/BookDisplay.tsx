"use client";
import { useBookContext } from "@/app/context/bookstore";
import { useEffect, useState } from "react";
import axios from "axios";
import CharacterDisplay from "./CharacterDisplay";

const BookDisplay = () => {
  const bookCtx = useBookContext();
  const [dispBook, setDispBook] = useState()

  const handleDelete = () => {

  }

  useEffect(() => {
    axios
      .get(`/api/book/${bookCtx.currBook}`)
      .then(res => {
        setDispBook(res.data)
      })
      .catch((err) => console.error(err));
  }, [bookCtx.currBook]);
  return (
    <>
      <div className="flex">
        {/*@ts-ignore */}
        <div>{dispBook?.userBook.title}</div>
        <button>edit</button>
      </div>
      <div className="flex">
        {/*@ts-ignore */}
        <div>{dispBook?.userBook.setting}</div>
        <button>edit</button>
      </div>
      <div className="flex">
        {/*@ts-ignore */}
        <div>{dispBook?.userBook.summary}</div>
        <button>edit</button>
      </div>
      {/*@ts-ignore */}
      <CharacterDisplay book={bookCtx.currBook}/>
      <div>
        <button onClick={handleDelete}>delete book</button>
      </div>
    </>
  );
};

export default BookDisplay;
