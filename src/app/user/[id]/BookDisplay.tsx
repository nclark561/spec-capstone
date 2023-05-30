"use client";
import { useBookContext } from "@/app/context/bookstore";
import { useEffect, useState } from "react";
import axios from "axios";
import CharacterDisplay from "./CharacterDisplay";
import Delete from "./Delete";

const BookDisplay = () => {
  const bookCtx = useBookContext();
  const [dispBook, setDispBook] = useState();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
  };

  useEffect(() => {
    axios
      .get(`/api/book/${bookCtx.currBook}`)
      .then((res) => {
        setDispBook(res.data);
      })
      .catch((err) => console.error(err));
  }, [bookCtx.currBook, deleting]);
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
      <CharacterDisplay book={bookCtx.currBook} />
      <div>
        <button onClick={handleDelete}>delete book</button>
      </div>
      {deleting && (
        <Delete
          setDeleting={setDeleting}
          table="book"
          delId={bookCtx.currBook}
          setCurrBook={bookCtx.setCurrBook}
        />
      )}
    </>
  );
};

export default BookDisplay;
