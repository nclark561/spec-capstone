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
      role: role.current?.value,
      //@ts-ignore
      description: description.current?.value,
    };

    axios
      .post(`/api/character?bookId=${props.book}`, body)
      .then((res) => {
        console.log(res.data);
        //@ts-ignore
        props.setCharList((prev) => [...prev, res.data.newChar]);
      })
      .catch((err) => console.error(err));

    props.setAdding(false);
  };

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    props.setAdding(false);
  };

  return (
    <div className="popup flex justify-center items-center">
      <form onSubmit={handleSubmit} className="rounded-md modal border flex flex-col justify-center items-center bg-gray-800 p-4">
        {/*@ts-ignore */}
        <input className="m-4 bg-gray-800 focus:outline-none text-white border-b" ref={name} type="text" placeholder="character name"></input>
        {/*@ts-ignore */}
        <input className="m-4 bg-gray-800 focus:outline-none text-white border-b" ref={role} type="text" placeholder="role of character"></input>
        {/*@ts-ignore */}
        <textarea className="m-4 bg-gray-800 focus:outline-none text-white border rounded p-1" ref={description} placeholder="description of character"
        ></textarea>
        <div className="flex gap-2">
          <input className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md w-[11vw] cursor-pointer" type="submit"></input>
          <button className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md w-[11vw] cursor-pointer" onClick={handleClick}>cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CharacterForm;
