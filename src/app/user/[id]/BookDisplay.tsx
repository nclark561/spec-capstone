"use client";
import { useBookContext } from "@/app/context/bookstore";
import { useEffect } from "react";
import axios from "axios";

const BookDisplay = () => {
  const bookCtx = useBookContext();
  console.log(bookCtx.currBook);

  useEffect(() => {
    axios
      .get(`/api/book/${bookCtx.currBook}`)
      .then(res => {
        console.log(res.data)
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      {/*@ts-ignore */}
      <div>{bookCtx.currBook.title}</div>
      <div></div>
      <div></div>
    </>
  );
};

export default BookDisplay;
