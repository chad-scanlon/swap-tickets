import "./App.css";
import react, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import SwapForm from "./Components/SwapForm";
import Success from "./Components/Success";
import Tickets from "./Components/Tickets";
import Ticket from "./Components/Tickets";
import AdminLogin from "./Components/AdminLogin";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import { InitialContext } from "./context/InitialContext";
import axiosWithAuth from "./utils/axiosWithAuth";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            marginTop: "-24%",
        },
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    logo: {
        fontFamily: "Marker Felt",
        fontSize: "4rem",
        color: "#3c3744",
        [theme.breakpoints.down("sm")]: {
            fontSize: "2.6rem",
            marginTop: "-2%",
        },
    },
    nav: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    navBar: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "80px",
        marginBottom: "1%",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
}));

function App() {
    const [tickets, setTickets] = useState([]);
    const [drivers, setDrivers] = useState([]);

    const theme = useTheme();
    const classes = useStyles();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

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
            });
    }, []);
    return (
        <>
            <Router>
                <InitialContext.Provider value={{ tickets, setTickets }}>
                    <div>
                        <Container
                            maxWidth="xl"
                            style={{
                                // backgroundColor: "#222629",
                                background:
                                    "linear-gradient(#3c3744,#b4c5e4, #fbfff1)",
                                borderRadius: "6px",
                                padding: "5%",
                            }}
                        >
                            <Container
                                maxWidth="md"
                                style={{
                                    borderRadius: "12px",
                                    backgroundColor: "white",
                                    boxShadow:
                                        "12px 0px 35px 0px rgba(0, 0, 0, 0.5)",
                                    padding: "4%",
                                }}
                            >
                                <div className={classes.nav}>
                                    <div className={classes.navBar}>
                                        <div>
                                            <p className={classes.logo}>
                                                swap tickets
                                            </p>
                                        </div>

                                        {matches ? (
                                            <div>
                                                <Button
                                                    href="/"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    size="small"
                                                >
                                                    Swap
                                                </Button>

                                                <Button
                                                    href="/admin-login"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    size="small"
                                                >
                                                    Admin
                                                </Button>

                                                <Button
                                                    href="/"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    size="small"
                                                >
                                                    Home
                                                </Button>
                                            </div>
                                        ) : (
                                            <div>
                                                <Button
                                                    href="/"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                >
                                                    Swap
                                                </Button>

                                                <Button
                                                    href="/admin-login"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                >
                                                    admin
                                                </Button>

                                                <Button
                                                    href="/"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                >
                                                    Home
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Route exact path="/">
                                    <SwapForm />
                                </Route>
                                <Route exact path="/admin-login">
                                    <AdminLogin />
                                </Route>
                            </Container>
                            <Route exact path="/admin-tickets">
                                <Tickets />
                            </Route>
                        </Container>
                    </div>
                </InitialContext.Provider>
            </Router>
        </>
    );
}

export default App;
