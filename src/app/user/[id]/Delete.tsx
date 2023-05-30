"use client";
import axios from "axios";

interface DeleteProp {
  setDeleting: any;
  delId: any;
  table: string;
  setCurrBook: any;
}

export default function Delete(props: DeleteProp) {
  const handleCancel = () => {
    props.setDeleting(false);
  };
  const handleDelete = () => {
    if(props.table === 'book') {
      props.setCurrBook(null)
    }

    axios
      .delete(`/api/${props.table}?id=${props.delId}`)
      .then((res) => {
        console.log(res.data)
        props.setDeleting(false)
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col">
      <h1>Are you sure you want to delete this {props.table}?</h1>
      <div className="flex">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}
