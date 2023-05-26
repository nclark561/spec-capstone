"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CharacterForm from "./CharacterForm";
import Delete from "./Delete";

interface CharProps {
  book: number;
}

export default function CharacterDisplay(props: CharProps) {
  const [charList, setCharList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currChar, setCurrChar] = useState();

  const handleClick = () => {
    setAdding(true);
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
  }, [props.book, deleting]);
  return (
    <div className="flex flex-col">
      <h4>characters:</h4>
      {charList.map((char: Character) => {
        return (
          <div key={char.id}>
            <p key={char.id}>{char.name}</p>
            <button>edit</button>
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
        <Delete setDeleting={setDeleting} table="character" delId={currChar} />
      )}
    </div>
  );
}
