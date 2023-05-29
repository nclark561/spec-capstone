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
    <form onSubmit={handleSubmit}>
      {/*@ts-ignore */}
      <input ref={name} type="text" defaultValue={props.char.name} />
      {/*@ts-ignore */}
      <input ref={role} type="text" defaultValue={props.char.role} />
      {/*@ts-ignore */}
      <textarea ref={description} defaultValue={props.char.description}></textarea>
      <input type="submit" value="update character" />
    </form>
  );
}
