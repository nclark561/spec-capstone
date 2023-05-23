"use client";
import { useState } from "react";

const BookForm = () => {
  const userId = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [setting, setSetting] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    console.log("title: ", title);
    console.log("setting: ", setting);
    console.log("summary: ", summary);
    console.log("userId: ", userId);

    setTitle('')
    setSetting('')
    setSummary('')
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        name="setting"
        placeholder="setting"
        value={setting}
        onChange={(e) => setSetting(e.target.value)}
      ></input>
      <textarea
        name="summary"
        placeholder="summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      ></textarea>
      <input className="cursor-pointer" type="submit" value="add book"></input>
    </form>
  );
};

export default BookForm;
