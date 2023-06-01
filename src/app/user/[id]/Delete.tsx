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
    if (props.table === "book") {
      props.setCurrBook(null);
    }

    axios
      .delete(`/api/${props.table}?id=${props.delId}`)
      .then((res) => {
        console.log(res.data);
        props.setDeleting(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="popup flex justify-center items-center">
      <div className="rounded-md modal border flex flex-col justify-center items-center bg-gray-800 p-4">
        <h1 className="text-2xl">
          Are you sure you want to delete this {props.table}?
        </h1>
        <div className="flex gap-6 m-5">
          <button
            onClick={handleDelete}
            className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md w-[11vw]"
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md w-[11vw]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
