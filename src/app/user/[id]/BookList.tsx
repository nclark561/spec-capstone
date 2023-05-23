"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
  const [book, setBook] = useState([]);
  const userId = localStorage.getItem('userId')
  console.log(userId)

  useEffect(() => {
    axios
      .get(`/api/book?id=${userId}`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data.userBook);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      {
        //@ts-ignore
        book.map((b) => <button key={b.id}>{b.title}</button>)
      }
    </>
  );
};

export default BookList;
