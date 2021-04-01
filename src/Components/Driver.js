import { useState } from "react";
import axios from "axios";

const Driver = (props) => {
    const [driver, setDriver] = useState([]);

    console.log(props);

    const handleDelete = (driver) => {
        axios
            .delete(
                `https://swap-tickets.herokuapp.com/api/drivers/${props.id}`
            )
            .then((res) => {
                setDriver(res.data);
                document.location.reload(true);
            })
            .catch((err) => {
                console.log(err.res);
            });
    };
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
                            handleDelete(driver);
                        }}
                    >
                        Done
                    </button>
                </div>
            </div>
        </>
    );
};

export default Driver;
