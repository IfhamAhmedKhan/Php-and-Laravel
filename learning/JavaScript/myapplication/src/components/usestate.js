import { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';

function UseState(){
    const [age, setAge] = useState({
        username: "Iftantary",
        age: 24,
        gender: "Male"
    });
    return (
        <>
            <h1>Welcome Dashboard</h1>
            <p>My name is {age.username}</p>
        </>
    );

}

export default UseState;
