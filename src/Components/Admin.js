import { useState, useEffect } from "react";
import Ticket from "./Ticket";
import Driver from "./Driver";
// import SwapForm from "./SwapForm";
import axiosWithAuth from "../utils/axiosWithAuth";

const Admin = () => {
    const [ticket, setTicket] = useState([]);
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
        axiosWithAuth()
            .get("/tickets")
            .then((res) => {
                console.log(res);
                console.log(localStorage.getItem("token"));
                setTicket(res.data);
            });
    }, []);
    useEffect(() => {
        axiosWithAuth()
            .get("/drivers")
            .then((res) => {
                console.log(res);
                setDrivers(res.data);
            });
    }, []);
    return (
        <>
            <h1 className="ticket-header">Locates</h1>
            <div className="ticket-holder">
                {ticket.map((tix) => (
                    <Ticket
                        key={tix.id}
                        id={tix.id}
                        salesperson={tix.salesperson}
                        year={tix.year}
                        model={tix.model}
                        body={tix.body}
                        pep={tix.pep}
                        ext={tix.ext}
                        int={tix.int}
                        options={tix.options}
                        notes={tix.notes}
                        isActive={tix.isActive}
                    ></Ticket>
                ))}
            </div>
            <h1 className="ticket-header">Driver Requests</h1>
            <div className="ticket-holder">
                {drivers.map((driver) => (
                    <Driver
                        id={driver.id}
                        salesperson={driver.salesperson}
                        description={driver.description}
                    ></Driver>
                ))}
            </div>
            {/* <SwapForm /> */}
        </>
    );
};
export default Admin;
