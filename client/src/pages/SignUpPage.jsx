import React from "react";
import SignUp from "../components/User/Signup";
import { NavLink } from "react-router-dom";


function SignUpPage({ onLogin, user, setUser}) {
    return (
        <>
            <h1> Recipe Realm</h1>
            <section>
                <SignUp onLogin={onLogin} user={user} setUser={setUser} />
            </section>
            
            <span>Already a member?</span>
            <NavLink to="/">
                Log In
            </NavLink>
        </>


    )


}

export default SignUpPage;