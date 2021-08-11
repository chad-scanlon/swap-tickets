import { useState, useContext, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory, Link, useParams } from "react-router-dom";
import { InitialContext } from "../context/InitialContext";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(3),
    },
    mainTicket: {
        position: "relative",
        background: "#fff",
        width: "300px",
        margin: "30px auto",
        boxShadow: "0px 2px 38px rgba(0, 0, 0, 0.2)",
        padding: "3%",
    },
}));

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
    const classes = useStyles();
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

    return (
        <>
            <div className="ticket-container">
                {backGroundGreen === false ? (
                    <Container className={classes.mainTicket}>
                        <p>Salesperson:{salesperson}</p>
                        <p>Year: {year}</p>
                        <p>Model: {model}</p>
                        <p>Body: {body}</p>
                        <p>PEP: {pep}</p>
                        <p>Exterior Color: {ext}</p>
                        <p>Interior Color: {int}</p>
                        <p>Options: {options}</p>
                        <p>Notes: {notes}</p>

                        <Button
                            variant="contained"
                            className={classes.button}
                            color="primary"
                            onClick={(e) => {
                                handleArchive(e);
                            }}
                        >
                            Archive
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.button}
                            color="primary"
                            onClick={handleBackGroundChange}
                        >
                            Locked In
                        </Button>
                    </Container>
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

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                setFormState({ isActive: false });
                            }}
                        >
                            Archive
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleBackGroundChange}
                        >
                            Locked In
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Ticket;
