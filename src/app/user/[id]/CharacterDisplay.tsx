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
    <div className="flex flex-col">
      <h4>characters:</h4>
      {charList.map((char: Character, idx) => {
        return (
          <div key={char.id}>
            <p key={char.id}>{char.name}</p>
            <button onClick={() => handleEdit(idx)}>edit</button>
            <button onClick={() => handleDelete(char.id)}>delete</button>
          </div>
        );
      })}
      {adding ? (
        <CharacterForm
          setAdding={setAdding}
          book={props.book}
          setCharList={setCharList}
        />
      ) : (
        <button onClick={handleClick}>add character</button>
      )}
      {deleting && (
        <Delete setDeleting={setDeleting} table="character" delId={currChar} setCurrBook={null}/>
      )}
      {editing && 
      (
        <CharEdit setEditing={setEditing} char={currChar}/>
      )}
    </div>
  );
}
