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
        .post("/api/chapter", body)
        .then(({ data }) => {
          console.log(data);
          props.setAdding(false);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <form>
      {/*@ts-ignore */}
      <input ref={num} type="number" defaultValue={props.editing ? props.chapter.num : null}
      />
      {/*@ts-ignore */}
      <input ref={name} defaultValue={props.editing ? props.chapter.name : null} />
      {/*@ts-ignore */}
      <textarea ref={outline} defaultValue={props.editing ? props.chapter.outline : null}
      ></textarea>
      <input type="submit" value={props.editing ? "update chapter" : "add chapter"} />
      <button onClick={handleCancel}>cancel</button>
    </form>
  );
}
