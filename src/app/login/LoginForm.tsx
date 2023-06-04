"use client";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/store";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const authCtx = useAuthContext();
  const router = useRouter()

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    let body = { username, password };

    axios
      .post(`/api/${register ? "register" : "login"}`, body)
      .then(res => {
        //@ts-ignore
        authCtx.login(res.data.token, res.data.exp, res.data.id)
        router.push(`/user/${res.data.id}`)
      })
      .catch(err => {
        console.error(err)
        alert(err.message)
      });
  };

  const handleClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    setRegister((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-md flex flex-col justify-center items-center bg-gray-800 p-2">
      <input
        className="mt-2 bg-gray-800 focus:outline-none text-white border-b"
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="m-4 bg-gray-800 focus:outline-none text-white border-b"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-[#6347FF] hover:bg-[#401FFF] anime2 text-white p-1 rounded-md w-[11vw]">{register ? "register" : "login"}</button>
      <button onClick={handleClick} className="text-white m-2 anime">
        {register
          ? "already have an account? login here"
          : "don't have an account? register here"}
      </button>
    </form>
  );
}
