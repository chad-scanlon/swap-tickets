import { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Driver = (props) => {
    const [driver, setDriver] = useState([]);
    const [formState, setFormState] = useState({
        description: "",
    });
    const handleArchive = (ticket) => {
        axiosWithAuth()
            .put(`/drivers/${props.id}`, formState)
            .then((res) => {
                setDriver(res.data);
                document.location.reload(true);
                setFormState({
                    description: "",
                });
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const handleDelete = (driver) => {
        axiosWithAuth
            .delete(`/drivers/${props.id}`)
            .then((res) => {
                setDriver(res.data);
                document.location.reload(true);
            })
            .catch((err) => {
                console.log(err.res);
            });
    };
    if (props.description.length <= 0) {
        return null;
    } else {
        return (
            <>
                <div className="ticket-container">
                    <div className="main-ticket">
                        <p>Salesperson: {props.salesperson}</p>
                        <p>Description: {props.description}</p>

                        <button
                            className="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleArchive(driver);
                                console.log(props.description);
                            }}
                        >
                            Archive
                        </button>
                    </div>
                </div>
            </>
        );
    }
};

export default Driver;
