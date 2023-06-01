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
    <div className="rounded-md m-2 border flex flex-col justify-center items-center bg-gray-800 p-2 bg-opacity-50">
      <h3 className="text-2xl">Chapters</h3>
      {chapterList.map((chapter: Chapter, idx) => {
        return (
          <div className="rounded-md m-2 gap-2 border flex flex-col justify-center items-center bg-gray-800 bg-opacity-75 p-2" key={chapter.id}>
            <p className="text-xl">Chapter {chapter.num}</p>
            <p className="font-light">{chapter.name}</p>
            <p className="text-center font-light">{chapter.outline}</p>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(idx)} className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md px-2 w-[5vw] cursor-pointer">edit</button>
              <button onClick={() => handleDelete(idx)} className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md px-2 w-[5vw] cursor-pointer">delete</button>
            </div>
          </div>
        );
      })}
      <button onClick={handleAdding} className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md px-2 cursor-pointer">add chapter</button>
      {adding && <ChapterForm setAdding={setAdding} setEditing={null} editing={editing} chapter={bookCtx.currBook}/>}
      {/*@ts-ignore */}
      {editing && <ChapterForm setAdding={null} setEditing={setEditing} editing={editing} chapter={currChap}/>}
      {/*@ts-ignore */}
      {deleting && <Delete setDeleting={setDeleting} delId={currChap.id} table="chapter"/>}
    </div>
  );
}
