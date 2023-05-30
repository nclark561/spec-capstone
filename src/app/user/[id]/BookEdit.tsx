"use client";
import { useRef } from "react";
import axios from "axios";

interface BookEdit {
  setEditing: any;
  book: any;
}

export default function BookEdit(props: BookEdit) {
  const title = useRef();
  const setting = useRef();
  const summary = useRef();

  console.log(props.book)

  const handleCancel = () => {
    props.setEditing(false);
  };

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    const body = {
      //@ts-ignore
      title: title.current.value,
      //@ts-ignore
      setting: setting.current.value,
      //@ts-ignore
      summary: summary.current.value,
    };

    axios
      .put(`/api/book?id=${props.book.id}`, body)
      .then(({ data }) => {
        console.log(data)
        props.setEditing(false)
      })
      .catch((err) => console.error(err));
  };
  return (
    <form onSubmit={handleSubmit}>
      {/*@ts-ignore */}
      <input ref={title} type="text" defaultValue={props.book.title} />
      {/*@ts-ignore */}
      <input ref={setting} type="text" defaultValue={props.book.setting} />
      {/*@ts-ignore */}
      <textarea ref={summary} defaultValue={props.book.summary}></textarea>
      <input type="submit" value="update book" className="cursor-pointer" />
      <button onClick={handleCancel}>cancel</button>
    </form>
  );
}
