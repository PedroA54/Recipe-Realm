import React, { useEffect, useContext } from "react"; // Import useContext
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import ManagementPage from '../pages/ManagementPage';
import SignUpPage from "../pages/SignUpPage";
import ProfilePage from '../pages/ProfilePage';
import DetailPage from '../pages/DetailPage';
import EntryPage from '../pages/EntryPage';
import HomePage from '../pages/HomePage';
import NavBar from './NavBar';
import '../styles/NavBar.css';
import '../styles/style.css';
import { UserContext } from './UserContext'; 

function App() {
    const { handleLogin } = useContext(UserContext); 

    useEffect(() => {
    fetch('/check_session', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
        
        handleLogin(data);
        }
    })
    .catch(error => {
        console.error('Error checking session:', error);
    });
    }, [handleLogin]); 

    return (
    <Router>
        <div>
        <UserContext.Consumer>
            {({ user, handleLogout }) => (
            <React.Fragment>
                {user && <NavBar />}
                <Switch>
                <Route exact path="/" render={EntryPage} />
                <Route path="/home" component={HomePage} />
                <Route path="/detail/:id" component={DetailPage } />
                <Route path="/management" component={ManagementPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/signup" component={SignUpPage} />
                </Switch>
            </React.Fragment>
            )}
        </UserContext.Consumer>
        </div>
    </Router>
    );
}

export default App;
