import React, { useContext } from "react";
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
    const { user } = useContext(UserContext);

    return (
        <Router>
            <div>
                {user && <NavBar />}
                <Switch>
                    <Route exact path="/" component={EntryPage} />
                    <Route path="/home" component={HomePage} />
                    <Route path="/detail/:id" component={DetailPage} />
                    <Route path="/management" component={ManagementPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/signup" component={SignUpPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
