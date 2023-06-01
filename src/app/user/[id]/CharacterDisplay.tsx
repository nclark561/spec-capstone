"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CharacterForm from "./CharacterForm";
import Delete from "./Delete";
import CharEdit from "./CharEdit";

interface CharProps {
  book: number;
}

export default function CharacterDisplay(props: CharProps) {
  const [charList, setCharList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currChar, setCurrChar] = useState();

  const handleClick = () => {
    setAdding(true);
  };

  const handleEdit = (idx: number) => {
    setEditing(true);
    setCurrChar(charList[idx]);
  };

  const handleDelete = (id: any) => {
    setDeleting(true);
    setCurrChar(id);
  };

  useEffect(() => {
    axios
      .get(`/api/character?bookId=${props.book}`)
      .then((res) => {
        console.log(res.data);
        setCharList(res.data.charList);
      })
      .catch((err) => console.error(err));
  }, [props.book, deleting, editing]);
  return (
    <div className="rounded-md m-2 border flex flex-col justify-center items-center bg-gray-800 p-2 bg-opacity-50">
        <h1 className="text-2xl">Characters</h1>
      <div className="flex justify-center items-center">
        {charList.map((char: Character, idx) => {
          return (
            <div key={char.id} className="rounded-md m-2 gap-2 border flex flex-col justify-center items-center bg-gray-800 bg-opacity-75 p-2">
              <p className="text-xl">{char.name}</p>
              <p className="font-light">{char.role}</p>
              <p className="text-center font-light">{char.description}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(idx)} className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md px-2 w-[5vw] cursor-pointer">edit</button>
                <button onClick={() => handleDelete(char.id)} className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md px-2 cursor-pointer">delete</button>
              </div>
            </div>
          );
        })}
      </div>
      {adding ? (
        <CharacterForm
          setAdding={setAdding}
          book={props.book}
          setCharList={setCharList}
        />
      ) : (
        <button onClick={handleClick} className="bg-[#6347FF] text-white p-1 hover:bg-[#401FFF] anime2 rounded-md w-[11vw] cursor-pointer">add character</button>
      )}
      {deleting && (
        <Delete
          setDeleting={setDeleting}
          table="character"
          delId={currChar}
          setCurrBook={null}
        />
      )}
      {editing && <CharEdit setEditing={setEditing} char={currChar} />}
    </div>
  );
}
