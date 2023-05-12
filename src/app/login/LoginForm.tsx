"use client";
import { useState } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { useAuthContext } from "../context/store";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const authCtx = useAuthContext();

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    let body = { username, password };

    axios
      .post(`/api/${register ? "register" : "login"}`, body)
      .then(res => {
        //@ts-ignore
        authCtx.login(res.data.token, res.data.exp, res.data.id)
      })
      .catch(err => {
        console.error(err)
        alert(err.response.data)
      });
  };

  const handleClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    setRegister((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{register ? "register" : "login"}</button>
      <button onClick={handleClick}>
        {register
          ? "already have an account? login here"
          : "don't have an account? register here"}
      </button>
    </form>
  );
}
