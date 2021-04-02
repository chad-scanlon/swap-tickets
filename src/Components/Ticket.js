import { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

// const initialTicket = {
//     id: "",
//     salesperson: "",
//     year: "",
//     model: "",
//     body: "",
//     pep: "",
//     ext: "",
//     int: "",
//     options: "",
//     notes: "",
//     isActive: true,
// };
const Ticket = (props) => {
    const [ticket, setTicket] = useState([]);
    const [formState, setFormState] = useState({
        isActive: false,
    });
    const [backGroundGreen, setBackGroundGreen] = useState(false);
    const handleBackGroundChange = () => {
        setBackGroundGreen(true);
    };

    // const handleChange = (event) => {
    //     event.persist();
    //     const newFormData = {
    //         ...formState,
    //         [event.target.name]: event.target.value,
    //     };

    //     setFormState(newFormData);
    // };

    const handleArchive = (ticket) => {
        axiosWithAuth()
            .put(`/tickets/${props.id}`, formState)
            .then((res) => {
                setTicket(res.data);
                document.location.reload(true);
                setFormState({
                    isActive: false,
                });
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    const handleDelete = (ticket) => {
        axiosWithAuth()
            .delete(`/tickets/${props.id}`)
            .then((res) => {
                setTicket(res.data);
                document.location.reload(true);
            })
            .catch((err) => {
                console.log(err.res);
            });
    };

    if (props.isActive !== true) {
        return null;
    } else {
        return (
            <>
                <div className="ticket-container">
                    {backGroundGreen === false ? (
                        <div className="main-ticket">
                            <p>Salesperson:{props.salesperson}</p>
                            <p>Year: {props.year}</p>
                            <p>Model: {props.model}</p>
                            <p>Body: {props.body}</p>
                            <p>PEP: {props.pep}</p>
                            <p>Exterior Color: {props.ext}</p>
                            <p>Interior Color: {props.int}</p>
                            <p>Options: {props.options}</p>
                            <p>Notes: {props.notes}</p>
                            <button
                                className="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(ticket);
                                }}
                            >
                                Delete
                            </button>

                            <button
                                className="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleArchive(ticket);
                                    console.log(`${props.isActive}`);
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
                            <p>Salesperson:{props.salesperson}</p>
                            <p>Year: {props.year}</p>
                            <p>Model: {props.model}</p>
                            <p>Body: {props.body}</p>
                            <p>PEP: {props.pep}</p>
                            <p>Exterior Color: {props.ext}</p>
                            <p>Interior Color: {props.int}</p>
                            <p>Options: {props.options}</p>
                            <p>Notes: {props.notes}</p>
                            <button
                                className="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(ticket);
                                }}
                            >
                                Delete
                            </button>

                            <button
                                className="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleArchive(ticket);
                                    console.log(`${props.isActive}`);
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
    }
};

export default Ticket;
