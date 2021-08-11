import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Tickets from "./Tickets";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    input: {
        margin: "1% auto",
        borderRadius: "8px",
        backgroundColor: "white",
    },
    typo: {
        color: "white",
    },
    button: {
        marginTop: theme.spacing(1),

        [theme.breakpoints.down("sm")]: {
            smarginTop: theme.spacing(0),
        },
    },

    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3%",
        borderRadius: "12px",
        marginBottom: "6%",
        boxShadow: "12px 0px 35px 0px rgba(0, 0, 0, 0.5)",
        background: "linear-gradient(#222629,#474B4F, #6B6E70)",
        // background: "linear-gradient(#fbfff1, #b4c5e4,#3c3744)",
    },
}));

const AdminLogin = () => {
    const theme = useTheme();
    const classes = useStyles();
    // const matches = useMediaQuery(theme.breakpoints.down("sm"));

    const [cred, setCred] = useState({
        username: "",
        password: "",
    });
    const { push } = useHistory();
    const handleChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post("/users/login", cred)
            .then((res) => {
                localStorage.setItem("token", res.data.payload);
                push("/admin-tickets");
            })
            .catch((err) => console.log("this is the error from login: ", err));
    };

    return (
        <>
            <div className="login-container">
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        name="username"
                        placeholder="Enter User Name"
                        value={cred.name}
                        onChange={handleChange}
                        variant="outlined"
                        className={classes.input}
                        required
                    />

                    <TextField
                        type="password"
                        placeholder="Enter User Password"
                        value={cred.password}
                        name="password"
                        onChange={handleChange}
                        variant="outlined"
                        className={classes.input}
                    />
                </form>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
