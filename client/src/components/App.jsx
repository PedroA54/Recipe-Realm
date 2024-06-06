import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Signup from '../components/User/Signup';
import Login from '../components/User/Login';
import EntryPage from '../pages/EntryPage'
import HomePage from '../pages/EntryPage'
import DetailPage from '../pages/EntryPage'
import ManagementPage from '../pages/EntryPage'
import ProfilPage from '../pages/ProfilePage'
import NavBar from './NavBar';

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
                <NavBar user={user} onLogout={handleLogout} />
                <Switch>
                    <Route exact path="/">
                        <EntryPage />
                    </Route>
                    <Route path="/home">
                        <HomePage user={user}/>
                    </Route>

                    <Route path="/detail">
                        <DetailPage user={user} />
                    </Route>

                    <Route path="/management">
                        <ManagementPage user={user} />
                    </Route>

                    <Route path="/profile">
                        <ProfilPage user={user} />
                    </Route>

                    <Route path="/signup">
                        <Signup onLogin={handleLogin} user={user} setUser={setUser} />
                    </Route>

                    <Route path="/login">
                        <Login onLogin={handleLogin} user={user} setUser={setUser} />
                    </Route>

                </Switch>
            </div>
        </Router>
    )
    
}

export default App;