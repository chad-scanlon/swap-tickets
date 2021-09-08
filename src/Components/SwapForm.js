import { useState, useEffect } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { formSchema } from "../utils/yupSchema";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import StepIcon from "@material-ui/core/StepIcon";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },

    input: {
        margin: "1% auto",
        borderRadius: "8px",
        backgroundColor: "white",
    },
    typo: {
        color: "white",
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            smarginTop: theme.spacing(0),
            marginRight: theme.spacing(0),
        },
    },

    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3%",
        borderRadius: "12px",
        marginBottom: "6%",
        boxShadow: "12px 0px 35px 0px rgba(0, 0, 0, 0.5)",
        background: "linear-gradient(#222629,#474B4F, #6B6E70)",
        // background: "linear-gradient(#fbfff1, #b4c5e4,#3c3744)",
    },
}));

function getSteps() {
    return [
        "Fill in vehicle criteria",
        "Add notes",
        "Double-check form inputs",
    ];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return "Complete the Swap Form as thoroughly as possible.";
        case 1:
            return "Don't forget to provide additional notes like MSRP limits, color preferences, 'would be nice to haves', etc.";
        case 2:
            return "Make sure your criteria is correct before clicking submit.";
        default:
            return "Unknown step";
    }
}

const SwapForm = () => {
    const theme = useTheme();
    const classes = useStyles();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    const [success, setSuccess] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const token = localStorage.getItem("token");

    const { push } = useHistory();
    const [ticket, setTicket] = useState([]);

    const [formState, setFormState] = useState({
        salesperson: "",
        year: "",
        model: "",
        body: "",
        pep: "",
        ext: "",
        int: "",
        options: "",
        notes: "",
        isActive: "",
    });
    const [errors, setErrors] = useState({
        salesperson: "",
        year: "",
        model: "",
        body: "",
        pep: "",
        ext: "",
        int: "",
        options: "",
        notes: "",
        isActive: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(formState).then((valid) => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const validateChange = (event) => {
        yup.reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then((valid) => {
                setErrors({
                    ...errors,
                    [event.target.name]: "",
                });
            })
            .catch((err) => {
                setErrors({
                    ...errors,
                    [event.target.name]: err.errors[0],
                });
            });
    };

    const handleChange = (event) => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value,
        };
        validateChange(event);
        setFormState(newFormData);
    };

    const handleLocateSubmit = (event) => {
        event.preventDefault();
        axios
            .post(
                "https://swap-tickets.herokuapp.com/api/tickets/admin-create-ticket",
                formState
            )
            .then((response) => {
                setTicket(response.data);
                setFormState({
                    salesperson: "",
                    year: "",
                    model: "",
                    body: "",
                    pep: "",
                    ext: "",
                    int: "",
                    options: "",
                    notes: "",
                    isActive: "",
                });
                setSuccess(true);
            })
            .catch((err) => {
                console.log(err.response);
                console.log("this is the post error");
            });
    };

    return (
        <>
            {matches ? (
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            ) : (
                <Stepper
                    activeStep={activeStep}
                    orientation="horizontal"
                    alternativeLabel
                >
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            )}
            <div>
                {activeStep === steps.length ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "2%",
                        }}
                    >
                        <Typography className={classes.instructions}>
                            {getStepContent(activeStep)}
                        </Typography>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1
                                    ? "Finish"
                                    : "Next"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <Container maxWidth="sm">
                <form className={classes.form} onSubmit={handleLocateSubmit}>
                    <TextField
                        id="salesperson"
                        label="salesperson"
                        name="salesperson"
                        variant="outlined"
                        className={classes.input}
                        value={formState.salesperson}
                        onChange={handleChange}
                        required
                    />
                    {errors.salesperson.length > 0 ? (
                        <p className="error">{errors.salesperson}</p>
                    ) : null}
                    <TextField
                        id="year"
                        variant="outlined"
                        name="year"
                        label="year"
                        required
                        className={classes.input}
                        value={formState.year}
                        onChange={handleChange}
                    />
                    {errors.model.length > 0 ? (
                        <p className="error">{errors.year}</p>
                    ) : null}

                    <TextField
                        id="model"
                        variant="outlined"
                        name="model"
                        label="model"
                        required
                        className={classes.input}
                        value={formState.model}
                        onChange={handleChange}
                    />
                    {errors.model.length > 0 ? (
                        <p className="error">{errors.model}</p>
                    ) : null}

                    <TextField
                        id="body"
                        variant="outlined"
                        name="body"
                        label="body"
                        className={classes.input}
                        value={formState.body}
                        onChange={handleChange}
                    />

                    <TextField
                        id="pep"
                        variant="outlined"
                        name="pep"
                        label="pep"
                        className={classes.input}
                        value={formState.pep}
                        onChange={handleChange}
                    />

                    <TextField
                        id="ext"
                        variant="outlined"
                        name="ext"
                        label="ext"
                        className={classes.input}
                        value={formState.ext}
                        onChange={handleChange}
                    />

                    <TextField
                        id="int"
                        variant="outlined"
                        name="int"
                        label="int"
                        className={classes.input}
                        value={formState.int}
                        onChange={handleChange}
                    />

                    <TextField
                        id="options"
                        variant="outlined"
                        name="options"
                        label="options"
                        className={classes.input}
                        value={formState.options}
                        onChange={handleChange}
                    />

                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        placeholder="additional notes"
                        id="notes"
                        variant="outlined"
                        name="notes"
                        className={classes.input}
                        onChange={handleChange}
                        value={formState.notes}
                    />

                    <label className="checkbox">
                        <span
                            style={{
                                fontSize: "1.2rem",
                                padding: "6px",
                            }}
                        >
                            Authorize
                        </span>
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={!buttonDisabled}
                            onChange={handleChange}
                        />
                    </label>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={buttonDisabled}
                        onClick={handleLocateSubmit}
                    >
                        Submit
                    </Button>
                </form>
                {success ? (
                    <Alert
                        onClose={() => {
                            setSuccess(false);
                        }}
                        severity="success"
                    >
                        <AlertTitle>Success</AlertTitle>
                        <strong>Swap request submitted</strong>
                    </Alert>
                ) : null}
            </Container>
        </>
    );
};

export default SwapForm;
