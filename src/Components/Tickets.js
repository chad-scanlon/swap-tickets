import React, { useState, useEffect, useContext } from "react";
import Ticket from "./Ticket";
import Driver from "./Driver";
import axiosWithAuth from "../utils/axiosWithAuth";
import { InitialContext } from "../context/InitialContext";
import { Link } from "react-router-dom";
import ManageTicket from "../purgable/ManageTicket";
import TicketManager from "../purgable/TicketManager";

const Tickets = (props) => {
    const { tickets, setTickets } = useContext(InitialContext);

    return (
        <>
            <h1 className="ticket-header">Locates</h1>
            <div className="ticket-holder">
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
            </div>

            {/* <h1 className="ticket-header">Driver Requests</h1>
            <div className="ticket-holder">
                {drivers.map((driver) => (
                    <Driver
                        id={driver.id}
                        salesperson={driver.salesperson}
                        description={driver.description}
                    ></Driver>
                ))}
            </div> */}
        </>
    );
};
export default Tickets;
