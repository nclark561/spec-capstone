"use client";
import { useState } from "react";
import styles from './LoginForm.module.css'
import axios from "axios";

export default function LoginForm() {
  const [register, setRegister] = useState(false);

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault()

    axios.post(`/api/${register ? 'register' : 'login'}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch(err => console.error(err))
  }

  const handleClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault()
    setRegister(prev => !prev)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" />
        <input type="text" />
        <button type="submit">{register ? 'register' : 'login'}</button>
        <button onClick={handleClick}>{register ? 'already have an account? login here' : 'don\'t have an account? register here'}</button>
    </form>
  );
}
