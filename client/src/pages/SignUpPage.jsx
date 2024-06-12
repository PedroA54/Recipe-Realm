import React from "react";
import SignUp from "../components/User/Signup";



function SignUpPage({ onLogin, user, setUser}) {
    return (
        <>
            <section>
                <SignUp onLogin={onLogin} user={user} setUser={setUser} />
            </section>
        </>


    )


}

export default SignUpPage;