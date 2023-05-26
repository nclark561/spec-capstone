"use client";
import { useRef } from "react";
import axios from "axios";

interface BookFormProp {
  book: number;
  setAdding: any;
  setCharList: any;
}

const CharacterForm = (props: BookFormProp) => {
  const name = useRef();
  const role = useRef();
  const description = useRef();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const body = {
      //@ts-ignore
      name: name.current?.value,
      //@ts-ignore
      role: name.current?.value,
      //@ts-ignore
      description: name.current?.value,
    };

    axios
      .post(`/api/character?bookId=${props.book}`, body)
      .then((res) => {
        console.log(res.data)
        //@ts-ignore
        props.setCharList(prev => [...prev, res.data.newChar])
      })
      .catch((err) => console.error(err));

    props.setAdding(false)
  };

  return (
    <form onSubmit={handleSubmit}>
      {/*@ts-ignore */}
      <input ref={name} type="text" placeholder="character name"></input>
      {/*@ts-ignore */}
      <input ref={role} type="text" placeholder="role of character"></input>
      {/*@ts-ignore */}
      <textarea ref={description} placeholder="description of character"
      ></textarea>
      <input type="submit"></input>
    </form>
  );
};

export default CharacterForm;
