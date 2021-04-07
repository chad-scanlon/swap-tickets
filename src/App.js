import "./App.css";
import react, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import SwapForm from "./Components/SwapForm";
import Success from "./Components/Success";
import Tickets from "./Components/Tickets";
import Ticket from "./Components/Tickets";
import AdminLogin from "./Components/AdminLogin";

import { InitialContext } from "./context/InitialContext";
import axiosWithAuth from "./utils/axiosWithAuth";

function App() {
    const [tickets, setTickets] = useState([]);
    const [drivers, setDrivers] = useState([]);

    // useEffect(() => {
    //     let tempArr = [];
    //     axiosWithAuth()
    //         .get("/tickets")
    //         .then((res) => {
    //             console.log(res);
    //             setTickets(res.data);
    //         });
    // }, []);
    useEffect(() => {
        axiosWithAuth()
            .get("/tickets")
            .then((response) => {
                let actives = [];
                response.data.forEach((res) => {
                    if (res.isActive === true) {
                        actives.push(res);
                    }
                });
                setTickets(actives);
                console.log(actives);
            });
    }, []);
    return (
        <>
            <Router>
                <InitialContext.Provider value={{ tickets, setTickets }}>
                    <div className="App">
                        <div className="nav">
                            <div className="nav-bar">
                                <div className="nav-logo">
                                    <span>Causeway Locator</span>
                                </div>
                                <Link to="/swap-form">
                                    <button className="button">Swap</button>
                                    {""}
                                </Link>
                                <Link to="/admin-login">
                                    <button className="button">Admin</button>
                                </Link>
                                <Link to="/">
                                    <button className="button">Home</button>
                                </Link>
                            </div>
                        </div>
                        <Route exact path="/">
                            <LandingPage />
                        </Route>
                        <Route exact path="/swap-form">
                            <SwapForm />
                        </Route>
                        <Route exact path="/admin-login">
                            <AdminLogin />
                        </Route>
                        <Route exact path="/admin-tickets">
                            <Tickets />
                        </Route>

                        <Route exact path="/success">
                            <Success />
                        </Route>
                    </div>
                </InitialContext.Provider>
            </Router>
        </>
    );
}

export default App;
