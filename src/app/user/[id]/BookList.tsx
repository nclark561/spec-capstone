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
  }, [bookCtx.bookList, bookCtx.currBook]);
  return (
    <>
      {
        //@ts-ignore
        book.map((b) => <button className="border-b border-t border-gray-500 hover:bg-[#12007A] anime2 p-1 " key={b.id} value={b.id} onClick={handleClick}>{b.title}</button>)
      }
      <button className="bg-[#6347FF] text-white p-1 rounded-md w-[11vw] cursor-pointer m-2" onClick={handleAdd}>add book</button>
    </>
  );
};

export default BookList;
