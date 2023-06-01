"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

interface CharEdit {
  setEditing: any;
  char: any;
}

export default function CharEdit(props: CharEdit) {
  const name = useRef();
  const role = useRef();
  const description = useRef();

  const handleCancel = () => {
    props.setEditing(false)
  }

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    const body = {
      //@ts-ignore
      name: name.current.value,
      //@ts-ignore
      role: role.current.value,
      //@ts-ignore
      description: description.current.value,
    };

    axios
      .put(`/api/character?id=${props.char.id}`, body)
      .then(({ data }) => {
        console.log(data)
      })
      .catch((err) => console.error(err));

    props.setEditing(false)
  };

  return (
    <div className="popup flex justify-center items-center">
      <form onSubmit={handleSubmit} className="rounded-md modal border flex flex-col justify-center items-center bg-gray-800 p-4">
        {/*@ts-ignore */}
        <input className="m-4 bg-gray-800 focus:outline-none text-white border-b" ref={name} type="text" defaultValue={props.char.name} />
        {/*@ts-ignore */}
        <input className="m-4 bg-gray-800 focus:outline-none text-white border-b" ref={role} type="text" defaultValue={props.char.role} />
        {/*@ts-ignore */}
        <textarea className="m-4 bg-gray-800 focus:outline-none text-white border rounded p-1" ref={description} defaultValue={props.char.description}></textarea>
        <div className="flex gap-2">
          <input className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md w-[11vw] cursor-pointer" type="submit" value="update character"/>
          <button className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md w-[11vw] cursor-pointer" onClick={handleCancel}>cancel</button>
        </div>
      </form>
    </div>
  );
}
