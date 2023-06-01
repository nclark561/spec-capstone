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
    <div className="popup flex justify-center items-center">
      <form onSubmit={handleSubmit} className="rounded-md modal border flex flex-col justify-center items-center bg-gray-800 p-4">
        {/*@ts-ignore */}
        <input className="m-4 bg-gray-800 focus:outline-none text-white border-b" ref={title} type="text" defaultValue={props.book.title} />
        {/*@ts-ignore */}
        <input className="m-4 bg-gray-800 focus:outline-none text-white border-b" ref={setting} type="text" defaultValue={props.book.setting} />
        {/*@ts-ignore */}
        <textarea className="m-4 bg-gray-800 focus:outline-none text-white border rounded p-1" ref={summary} defaultValue={props.book.summary}></textarea>
        <div className="flex gap-2">
          <input className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md w-[11vw] cursor-pointer" type="submit" value="update book"/>
          <button className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md w-[11vw] cursor-pointer" onClick={handleCancel}>cancel</button>
        </div>
      </form>
    </div>
  );
}
