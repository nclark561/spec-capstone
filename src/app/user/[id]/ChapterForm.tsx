"use client";
import { useRef } from "react";
import axios from "axios";

interface ChapterProp {
  setAdding: any;
  setEditing: any;
  editing: boolean;
  chapter: any;
}

export default function ChapterForm(props: ChapterProp) {
  const num = useRef();
  const name = useRef();
  const outline = useRef();

  const handleCancel = () => {
    if (props.editing) {
      props.setEditing(false);
    } else {
      props.setAdding(false);
    }
  };

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    const body = {
      //@ts-ignore
      num: num.current?.value,
      //@ts-ignore
      name: name.current?.value,
      //@ts-ignore
      outline: outline.current?.value,
    };

    if (props.editing) {
      axios
        .put(`/api/chapter?id=${props.chapter.id}`, body)
        .then(({ data }) => {
          console.log(data);
          props.setEditing(false);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post(`/api/chapter?bookId=${props.chapter}`, body)
        .then(({ data }) => {
          console.log(data);
          props.setAdding(false);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="popup flex justify-center items-center">
      <form onSubmit={handleSubmit} className="rounded-md modal border flex flex-col justify-center items-center bg-gray-800 p-4">
        {/*@ts-ignore */}
        <input className="m-4 bg-gray-800 focus:outline-none text-white border-b" placeholder="number" ref={num} type="number" defaultValue={props.editing ? props.chapter.num : null}
        />
        {/*@ts-ignore */}
        <input className="m-4 bg-gray-800 focus:outline-none text-white border-b" placeholder="chapter name" ref={name} defaultValue={props.editing ? props.chapter.name : null} />
        {/*@ts-ignore */}
        <textarea className="m-4 bg-gray-800 focus:outline-none text-white border rounded p-1" placeholder="outline" ref={outline} defaultValue={props.editing ? props.chapter.outline : null}
        ></textarea>
        <div className="flex gap-2">
          <input type="submit" className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md w-[11vw] cursor-pointer" value={props.editing ? "update chapter" : "add chapter"} />
          <button onClick={handleCancel} className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md w-[11vw] cursor-pointer">cancel</button>
        </div>
      </form>
    </div>
  );
}
