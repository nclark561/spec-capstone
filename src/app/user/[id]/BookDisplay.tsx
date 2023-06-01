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
  const [display, setDisplay] = useState('')

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
      <div className="rounded-md m-2 border flex flex-col justify-center items-center bg-gray-800 p-2 bg-opacity-50">
        <h1 className="text-2xl">Overview</h1>
        {/*@ts-ignore */}
        <p className="my-2">Title: {dispBook?.userBook.title}</p> 
        {/*@ts-ignore */}
        <p>Setting: {dispBook?.userBook.setting}</p>
        {/*@ts-ignore */}
        <p className="max-w-[25vw] text-center my-2">Summary: {dispBook?.userBook.summary}</p>
        <button onClick={handleEdit} className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md px-2 cursor-pointer">edit book</button>
      </div>
      {/*@ts-ignore */}
      {display === 'character' && <CharacterDisplay book={bookCtx.currBook} />}
      {display === 'chapter' && <ChapterDisplay />}
      <div className="flex gap-5">
        <button onClick={() => setDisplay('character')} className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md px-2 cursor-pointer">Display Characters</button>
        <button onClick={() => setDisplay('chapter')} className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md px-2 cursor-pointer">Display Chapters</button>
      </div>
      {editing && (
        //@ts-ignore
        <BookEdit setEditing={setEditing} book={dispBook.userBook}/>
      )}
      <div>
        <button onClick={handleDelete} className="bg-[#6347FF] hover:bg-[#401FFF] m-2 anime2 text-white p-1 rounded-md px-2 cursor-pointer">delete book</button>
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
