"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useBookContext } from "@/app/context/bookstore";
import Delete from "./Delete";
import ChapterForm from "./ChapterForm";

export default function ChapterDisplay() {
  const [chapterList, setChapterList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currChap, setCurrChap] = useState()
  const bookCtx = useBookContext();

  const handleEdit = (index: number) => {
    setEditing(true);
    setCurrChap(chapterList[index])
  };

  const handleDelete = (index: number) => {
    setDeleting(true);
    setCurrChap(chapterList[index])
  };

  const handleAdding = () => {
    setAdding(true)
  }

  useEffect(() => {
    axios
      .get(`/api/chapter?bookId=${bookCtx.currBook}`)
      .then(({ data }) => {
        setChapterList(data.chapterList);
      })
      .catch((err) => console.error(err));
  }, [bookCtx.currBook, adding, editing, deleting]);

  return (
    <div className="flex flex-col">
      <h3>Chapters:</h3>
      {chapterList.map((chapter: Chapter, idx) => {
        return (
          <div className="flex flex-col" key={chapter.id}>
            <h3>Chapter {chapter.num}</h3>
            <h3>{chapter.name}</h3>
            <p>{chapter.outline}</p>
            <div className="flex">
              <button onClick={() => handleEdit(idx)}>edit</button>
              <button onClick={() => handleDelete(idx)}>delete</button>
            </div>
          </div>
        );
      })}
      <button onClick={handleAdding}>add chapter</button>
      {adding && <ChapterForm setAdding={setAdding} setEditing={null} editing={editing} chapter={bookCtx.currBook}/>}
      {/*@ts-ignore */}
      {editing && <ChapterForm setAdding={null} setEditing={setEditing} editing={editing} chapter={currChap}/>}
      {/*@ts-ignore */}
      {deleting && <Delete setDeleting={setDeleting} delId={currChap.id} table="chapter"/>}
    </div>
  );
}
