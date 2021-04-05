import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import SwapForm from "./Components/SwapForm";
import Admin from "./Components/Admin";
import AdminLogin from "./Components/AdminLogin";
import Success from "./Components/Success";

function App() {
    return (
        <>
            <Router>
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
                    <Route exact path="/admin">
                        <Admin />
                    </Route>
                    <Route exact path="/success">
                        <Success />
                    </Route>
                </div>
            </Router>
        </>
    );
}

export default App;
