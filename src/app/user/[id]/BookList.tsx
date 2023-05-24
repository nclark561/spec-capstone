"use client";
import { useEffect, useState } from "react";
import { useBookContext } from "@/app/context/bookstore";
import axios from "axios";

const BookList = () => {
  const [book, setBook] = useState([]);
  const userId = localStorage.getItem('userId')
  const bookCtx = useBookContext()

  const handleClick = (evt: React.SyntheticEvent) => {
    //@ts-ignore
    bookCtx.setCurrBook(evt.target.value)
  }

  const handleAdd = () => {
    //@ts-ignore
    bookCtx.setCurrBook(null)
  }

  useEffect(() => {
    axios
      .get(`/api/book?id=${userId}`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data.userBook);
      })
      .catch((err) => console.error(err));
  }, [bookCtx.bookList]);
  return (
    <>
      {
        //@ts-ignore
        book.map((b) => <button key={b.id} value={b.id} onClick={handleClick}>{b.title}</button>)
      }
      <button onClick={handleAdd}>add book</button>
    </>
  );
};

export default BookList;
