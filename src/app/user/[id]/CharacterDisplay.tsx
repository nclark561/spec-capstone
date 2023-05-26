"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CharacterForm from "./CharacterForm";

interface CharProps {
  book: number;
}

export default function CharacterDisplay(props: CharProps) {
  const [charList, setCharList] = useState([]);
  const [adding, setAdding] = useState(false)

  const handleClick = () => {
    setAdding(true)
  }

  useEffect(() => {
    axios
      .get(`/api/character?bookId=${props.book}`)
      .then((res) => {
        console.log(res.data)
        setCharList(res.data.charList)
      })
      .catch((err) => console.error(err));
  }, [props.book]);
  return (
    <div className="flex flex-col">
        <h4>characters:</h4>
        {/*@ts-ignore */}
      {charList.map(char => <p key={char.id}>{char.name}</p>)}
      {
        adding ? (
            <CharacterForm setAdding={setAdding} book={props.book} setCharList={setCharList}/>
        ) : (
            <button onClick={handleClick}>add character</button>
        )
      }
    </div>
  );
}
