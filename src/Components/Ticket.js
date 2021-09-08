import { useState, useContext, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory, Link, useParams } from "react-router-dom";
import { InitialContext } from "../context/InitialContext";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
    const handleDelete = (e) => {
        axiosWithAuth()
            .delete(`/tickets/${id}`)
            .then((res) => {
                console.log(res);
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

    // const handleArchive = (e) => {
    //     axiosWithAuth()
    //         .put(`/tickets/${id}`, formState)
    //         .then((res) => {
    //             setFormState({
    //                 isActive: false,
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err.response);
    //         });
    //     axiosWithAuth()
    //         .get("/tickets")
    //         .then((res) => {
    //             setTickets(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err.response);
    //         });
    // };

    return (
        <>
            <Card className={classes.mainTicket}>
                <CardContent>
                    <Typography component="p">
                        Salesperson:{salesperson}
                    </Typography>
                    <Typography component="p">Year: {year}</Typography>
                    <Typography component="p">Model: {model}</Typography>
                    <Typography component="p">Body: {body}</Typography>
                    <Typography component="p">PEP: {pep}</Typography>
                    <Typography component="p">Exterior Color: {ext}</Typography>
                    <Typography component="p">Interior Color: {int}</Typography>
                    <Typography component="p">Options: {options}</Typography>
                    <Typography component="p">Notes: {notes}</Typography>
                </CardContent>

                <CardActions className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default Ticket;
