import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledInput = styled.input`
    margin-top: 3%;
    min-height: 8vh;
    min-width: 16vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
    border: none;
    outline: none;
    padding: 10px;
    margin: 10px auto;
`;

const AdminLogin = () => {
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
                console.log("admin login page data: ", res);
                localStorage.setItem("token", res.data.payload);
                push("/admin");
            })
            .catch((err) => console.log("this is the error from login: ", err));
    };

    return (
        <>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <div className="userName">
                        <label htmlFor="username">
                            <StyledInput
                                type="text"
                                name="username"
                                placeholder="Enter User Name"
                                value={cred.name}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="password">
                        <label htmlFor="password">
                            <StyledInput
                                type="password"
                                placeholder="Enter User Password"
                                value={cred.password}
                                name="password"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </form>
                <div className="buttons">
                    <button className="button" onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
