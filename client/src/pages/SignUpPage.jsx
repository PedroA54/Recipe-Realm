import React from "react";
import SignUp from "../components/User/Signup";
import { NavLink } from "react-router-dom";


function SignUpPage({ onLogin, user, setUser}) {
    return (
        <>
            <h1 className="title-signup"> Recipe Realm</h1>
            
            <section>
                <SignUp onLogin={onLogin} user={user} setUser={setUser} />
            </section>
            
            <div className="signup-link">
                <span>Already a member?</span>
	            <NavLink to="/">
                        Log In
                </NavLink>
		    </div>
        </>
    );
}

export default SignUpPage;