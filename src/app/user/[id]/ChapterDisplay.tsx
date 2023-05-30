"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useBookContext } from "@/app/context/bookstore";

export default function ChapterDisplay() {
  const [chapterList, setChapterList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const bookCtx = useBookContext();

  const handleEdit = () => {
    setEditing(true)
  }

  const handleDelete = () => {
    setDeleting(true)
  }

  useEffect(() => {
    axios
      .get(`/api/chapter?bookId=${bookCtx.currBook}`)
      .then(({ data }) => {
        setChapterList(data.chapterList)
      })
      .catch((err) => console.error(err));
  }, [bookCtx.currBook, adding, editing, deleting]);

  return (
    <div>
      {chapterList.map((chapter: Chapter) => {
        return (
            <div className="flex flex-col">
                <h3>Chapter {chapter.num}</h3>
                <h3>{chapter.name}</h3>
                <p>{chapter.outline}</p>
                <div className="flex">
                    <button onClick={handleEdit}>edit</button>
                    <button onClick={handleDelete}>delete</button>
                </div>
            </div>
        )
      })}
    </div>
  );
}
