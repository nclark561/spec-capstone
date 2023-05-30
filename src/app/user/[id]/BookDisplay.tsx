"use client";
import { useBookContext } from "@/app/context/bookstore";
import { useEffect, useState } from "react";
import axios from "axios";
//@ts-ignore
import CharacterDisplay from "./CharacterDisplay";
import Delete from "./Delete";
import BookEdit from "./BookEdit";
import ChapterDisplay from "./ChapterDisplay";

const BookDisplay = () => {
  const bookCtx = useBookContext();
  const [dispBook, setDispBook] = useState();
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false)

  const handleDelete = () => {
    setDeleting(true);
  };

  const handleEdit = () => {
    setEditing(true)
  }

  useEffect(() => {
    axios
      .get(`/api/book/${bookCtx.currBook}`)
      .then((res) => {
        setDispBook(res.data);
      })
      .catch((err) => console.error(err));
  }, [bookCtx.currBook, deleting, editing]);
  return (
    <>
      <div className="flex">
        {/*@ts-ignore */}
        <div>{dispBook?.userBook.title}</div>
      </div>
      <div className="flex">
        {/*@ts-ignore */}
        <div>{dispBook?.userBook.setting}</div>
      </div>
      <div className="flex">
        {/*@ts-ignore */}
        <div>{dispBook?.userBook.summary}</div>
      </div>
      {/*@ts-ignore */}
      <CharacterDisplay book={bookCtx.currBook} />
      <ChapterDisplay />
      <div>
        <button onClick={handleEdit}>edit book</button>
      </div>
      {editing && (
        //@ts-ignore
        <BookEdit setEditing={setEditing} book={dispBook.userBook}/>
      )}
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
