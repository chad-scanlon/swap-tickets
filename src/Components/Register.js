import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 30%;
    padding: 1%;
    margin-left: 35%;
`;

const StyledButton = styled.button`
    background-color: orange;
    height: 30px;
    margin-top: 5px;
`;

const StyledInput = styled.input`
    height: 50px;
`;

const Register = () => {
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
            .post("/admin/register", cred)
            .then((res) => {
                console.log("login page data: ", res);
                localStorage.setItem("token", res.data.payload);
                push("/");
            })
            .catch((err) =>
                console.log("this is the error from client reg: ", err)
            );
    };
    return (
        <form onSubmit={handleSubmit}>
            <StyledContainer>
                <h1>Register as a new admin</h1>
                <StyledInput
                    placeholder="username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={cred.username}
                />
                <StyledInput
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={cred.password}
                />

                <div className="submit">
                    <StyledButton>Reg</StyledButton>
                </div>
            </StyledContainer>
        </form>
    );
};

export default Register;
