"use client";
import { useState } from "react";
import styles from './LoginForm.module.css'

export default function LoginForm() {
  const [register, setRegister] = useState(false);

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault()
  }

  const handleClick = () => {
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
