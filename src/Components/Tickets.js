import React, { useState, useEffect, useContext } from "react";
import Ticket from "./Ticket";
import Driver from "./Driver";
import axiosWithAuth from "../utils/axiosWithAuth";
import { InitialContext } from "../context/InitialContext";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    ticketsHolder: {
        display: "flex",
        flexWrap: "wrap",
        // justifyContent: "center",

        color: "#282c34",
        // border: "solid black 2px",
    },
}));

const Tickets = (props) => {
    const classes = useStyles();

    const { tickets, setTickets } = useContext(InitialContext);
    console.log(tickets);
    tickets.forEach((element) => {
        element.isActive
            ? console.log(element.salesperson)
            : console.log(element.isActive);
    });
    return (
        <>
            <Container className={classes.ticketsHolder}>
                {tickets.map((ticket) => (
                    <Ticket
                        key={ticket.id}
                        id={ticket.id}
                        salesperson={ticket.salesperson}
                        year={ticket.year}
                        model={ticket.model}
                        body={ticket.body}
                        pep={ticket.pep}
                        ext={ticket.ext}
                        int={ticket.int}
                        options={ticket.options}
                        notes={ticket.notes}
                        isActive={ticket.isActive}
                        setTickets={setTickets}
                    />
                ))}
            </Container>
        </>
    );
};
export default Tickets;
