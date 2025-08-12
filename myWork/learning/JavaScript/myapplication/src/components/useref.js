import {useState, useRef, useEffect} from 'react';
import ReactDOM from "react-router-dom";

function UserRef(){
    const inputElement = useRef()
    const [inputValue, setInputValue] = useState("");
    const PreviousInputValue = useRef("");
    //const count = useRef(0);

    const focusInput = () => {
        inputElement.current.focus();
    }

    useEffect(()=>{
       PreviousInputValue.current = inputValue
    }, [inputValue])

    return(
        <>
        <input
        type='text' 
        value = {inputValue}
        //ref = {inputElement}
        onChange={(e)=> setInputValue(e.target.value)}
        />
        <h1>Current value: {inputValue}</h1>  
        <h1>Previous value: {PreviousInputValue.current}</h1>
        
        </>
    )
}
//<!--<h1>Render Count: {count.current}</h1>-->
// <button onClick= {focusInput}>Focus Input</button>
export default UserRef;