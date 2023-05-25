"use client";
import { useBookContext } from "@/app/context/bookstore";
import { useEffect, useState } from "react";
import axios from "axios";

const BookDisplay = () => {
  const bookCtx = useBookContext();
  const [dispBook, setDispBook] = useState()

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
      <div>
        {/*@ts-ignore */}
        <div>{dispBook?.userBook.title}</div>
        <button>edit</button>
      </div>
      <div>
        {/*@ts-ignore */}
        <div>{dispBook?.userBook.setting}</div>
        <button>edit</button>
      </div>
      <div>
        {/*@ts-ignore */}
        <div>{dispBook?.userBook.summary}</div>
        <button>edit</button>
      </div>
    </>
  );
};

export default BookDisplay;
