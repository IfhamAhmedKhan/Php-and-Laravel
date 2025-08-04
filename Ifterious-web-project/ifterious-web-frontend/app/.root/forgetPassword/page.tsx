'use client'

import { useState } from "react"

export default function ForgetPassword () {
    const [email, setEmail] = useState('');

    const handleSubmit =  async (e: React.FormEvent)=> {
        e.preventDefault();
        
    }

    return (
        <>
        <div className="my-form">
        <fieldset>
            <legend>Reset password</legend>
            <form onSubmit={handleSubmit}>
                <label>Email<br/>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                </label>
                <button type="submit" >Send Email</button>
            </form>
        </fieldset>
        </div>
        </>
    )
}
