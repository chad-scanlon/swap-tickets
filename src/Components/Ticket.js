import { useState, useContext, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory, Link, useParams } from "react-router-dom";
import { InitialContext } from "../context/InitialContext";

const Ticket = ({
    id,
    salesperson,
    year,
    model,
    body,
    pep,
    ext,
    int,
    options,
    notes,
    isActive,
    setTickets,
}) => {
    const { push } = useHistory();
    const [ticket, setTicket] = useState();

    const [formState, setFormState] = useState({
        isActive: false,
    });
    const [backGroundGreen, setBackGroundGreen] = useState(false);
    const handleBackGroundChange = () => {
        setBackGroundGreen(true);
    };

    const handleArchive = (e) => {
        axiosWithAuth()
            .put(`/tickets/${id}`, formState)
            .then((res) => {
                setFormState({
                    isActive: false,
                });
            })
            .catch((err) => {
                console.log(err.response);
            });
        axiosWithAuth()
            .get("/tickets")
            .then((res) => {
                setTickets(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    // const handleDelete = (ticket) => {
    //     axiosWithAuth()
    //         .delete(`/tickets/${props.id}`)
    //         .then((res) => {
    //             setTicket(res.data);
    //             // document.location.reload(true);
    //             push("/");
    //         })
    //         .catch((err) => {
    //             console.log(err.res);
    //         });
    // };
    //
    //
    //
    // if (isActive !== true) {
    //     return null;
    // } else {
    return (
        <>
            <div className="ticket-container">
                {backGroundGreen === false ? (
                    <div className="main-ticket">
                        <p>Salesperson:{salesperson}</p>
                        <p>Year: {year}</p>
                        <p>Model: {model}</p>
                        <p>Body: {body}</p>
                        <p>PEP: {pep}</p>
                        <p>Exterior Color: {ext}</p>
                        <p>Interior Color: {int}</p>
                        <p>Options: {options}</p>
                        <p>Notes: {notes}</p>
                        {/* <button
                                className="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(ticket);
                                }}
                            >
                                Delete
                            </button> */}

                        <button
                            className="button"
                            onClick={(e) => {
                                handleArchive(e);
                            }}
                        >
                            Archive
                        </button>
                        <button
                            className="button"
                            onClick={handleBackGroundChange}
                        >
                            Locked In
                        </button>
                    </div>
                ) : (
                    <div className="locked-ticket">
                        <p>Salesperson:{salesperson}</p>
                        <p>Year: {year}</p>
                        <p>Model: {model}</p>
                        <p>Body: {body}</p>
                        <p>PEP: {pep}</p>
                        <p>Exterior Color: {ext}</p>
                        <p>Interior Color: {int}</p>
                        <p>Options: {options}</p>
                        <p>Notes: {notes}</p>
                        {/* <button
                                className="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(ticket);
                                }}
                            >
                                Delete
                            </button> */}

                        <button
                            className="button"
                            onClick={(e) => {
                                setFormState({ isActive: false });
                            }}
                        >
                            Archive
                        </button>
                        <button
                            className="button"
                            onClick={handleBackGroundChange}
                        >
                            Locked In
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
// };

export default Ticket;
