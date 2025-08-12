import { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import styles from './login.module.css';

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(1);

  useEffect (() => {
    setTimeout(()=> {
      setCount((count)=> count + 1);
    }, 1000);

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(name==="" && password==="") {
        alert("No data was input!")
    }else{
        alert(`Username: ${name}, Password ${password}`)
    }
  }
  return (
    <>
        <h1>Login {count}</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>Login: <br/>
        <input id="id1" className={styles.input} value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="Enter username" />
        <br />
        </label>
        <label className={styles.label}>Password: <br/>
        <input id="id2" type="password" className={styles.input} value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password" />
        </label>
        <br />
        
        <input className={styles.button} type="submit"/>
      </form>
    </>
  );
}

export default Login;
