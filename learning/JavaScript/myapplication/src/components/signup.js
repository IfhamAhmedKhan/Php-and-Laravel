import {useState} from 'react';
import './signup.css';

function SignUp(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if(repassword===password) {
            alert(`Username: ${username}, Email: ${email}, Password: ${password}, ConfirmPassword: ${repassword}`)
        }else{
            alert(`Username: ${username}, Email: ${email}, But the password didn't match!`)
        }

        
    }

    return(
        <>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
            <label>Username: 
                <input placeholder='Enter your username' type='text' value={username} onChange={(e)=> setUsername(e.target.value)}/>
            </label><br/>
            <label>Email: 
                <input placeholder='Enter your email' type='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </label><br/>
            <label>Password: 
                <input placeholder='Enter your password' type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </label><br/>
            <label>Confirm Password: 
                <input placeholder='Enter your password' type='password' value={repassword} onChange={(e)=> setRepassword(e.target.value)}/>
            </label><br/>

            <input type="submit"/>
        </form>
        </>
    );
}

export default SignUp;