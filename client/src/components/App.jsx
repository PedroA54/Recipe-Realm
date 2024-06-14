import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Signup from '../components/User/Signup';
import ManagementPage from '../pages/ManagementPage';
import SignUpPage from "../pages/SignUpPage";
import ProfilePage from '../pages/ProfilePage';
import DetailPage from '../pages/DetailPage';
import EntryPage from '../pages/EntryPage';
import HomePage from '../pages/HomePage';
import NavBar from './NavBar';
import Footer from './Footer'
import './NavBar.css';
import '../style.css';


function App() {
    const [user, setUser] = useState("");

    useEffect(() => {
        fetch('/check_session', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    setUser(data);
                }
            })
            .catch(error => {
                console.error('Error checking session:', error);
            });
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    setUser(null);
                }
            });
    };

    return (
        <Router>
            <div>
                
                {user && <NavBar user={user} onLogout={handleLogout} />}

                <Switch>
                    <Route exact path="/" render={() => <EntryPage onLogin={handleLogin} user={user}  setUser={setUser}/>} />
                    <Route path="/home" component={() => <HomePage user={user} />} />
                    <Route path="/detail/:id" component={() => <DetailPage user={user} />} />
                    <Route path="/management" component={() => <ManagementPage user={user} />} />
                    <Route path="/profile" component={() => <ProfilePage user={user} />} />
                    <Route path="/signup" render={() => <SignUpPage onLogin={handleLogin} user={user}  setUser={setUser}/>} />

                </Switch>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
