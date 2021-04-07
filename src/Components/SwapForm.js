import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

const formSchema = yup.object().shape({
    salesperson: yup.string().required("please enter a name"),
    year: yup.string().notRequired("please enter a year"),
    model: yup.string().required("please enter a model"),
    body: yup.string().notRequired("please enter a body"),
    pep: yup.string().notRequired("please enter a pep code"),
    ext: yup.string().notRequired("please enter an exterior color"),
    int: yup.string().notRequired("please enter an interior color"),
    options: yup
        .string()
        .notRequired("please enter whatever options are needed"),
    notes: yup.string().notRequired("please enter any notes, VINs, etc."),
    isActive: yup.bool().oneOf([true], "please check the box"),
});

const StyledInput = styled.input`
    margin-left: 1%;
    min-height: 8vh;
    min-width: 21vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
    border: none;
    outline: none;
    padding: 10px;
    margin: 10px auto;
`;
const StyledTextArea = styled.textarea`
    margin-top: 1%;
    margin-left: 1%;
    min-height: 50vh;
    min-width: 22vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
    border: none;
    outline: none;
`;

const SwapForm = () => {
    const token = localStorage.getItem("token");

    const { push } = useHistory();
    const [ticket, setTicket] = useState([]);
    const [drivers, setDrivers] = useState([]);
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

    const [driverFormState, setDriverFormState] = useState({
        salesperson: "",
        description: "",
    });
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

    const handleDriverChange = (event) => {
        setDriverFormState({
            ...driverFormState,
            [event.target.name]: event.target.value,
        });
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
                push("/success");
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    const handleDriverSubmit = (event) => {
        event.preventDefault();
        axios
            .post(
                "https://swap-tickets.herokuapp.com/api/drivers/admin-create-driver",
                driverFormState
            )
            .then((response) => {
                console.log(response);
                setDrivers(response.data);
                setDriverFormState({
                    salesperson: "",
                    description: "",
                });
                // push("/success");
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    return (
        <>
            <div
                className="forms-container"
                style={{
                    padding: "7%",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 2fr)",
                    gridColumnGap: "15%",
                    backgroundColor: "rgb(223, 48, 48)",
                    marginTop: "3%",
                }}
            >
                <form className="ticket-form" onSubmit={handleLocateSubmit}>
                    <div className="form-instructions">
                        <span>Complete Swap Form</span>
                        <span>Provide as much detail as possible</span>
                    </div>

                    <label htmlFor="salesperson">
                        <StyledInput
                            id="salesperson"
                            type="text"
                            name="salesperson"
                            placeholder="salesperson"
                            required={true}
                            value={formState.salesperson}
                            onChange={handleChange}
                        />
                        {errors.salesperson.length > 0 ? (
                            <p className="error">{errors.salesperson}</p>
                        ) : null}
                    </label>
                    <label htmlFor="year">
                        <StyledInput
                            id="year"
                            type="text"
                            name="year"
                            placeholder="year"
                            value={formState.year}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="model">
                        <StyledInput
                            id="model"
                            type="text"
                            name="model"
                            placeholder="model"
                            value={formState.model}
                            onChange={handleChange}
                        />
                        {errors.model.length > 0 ? (
                            <p className="error">{errors.model}</p>
                        ) : null}
                    </label>
                    <label htmlFor="body">
                        <StyledInput
                            id="body"
                            type="text"
                            name="body"
                            placeholder="body"
                            value={formState.body}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="pep">
                        <StyledInput
                            id="pep"
                            type="text"
                            name="pep"
                            placeholder="pep"
                            value={formState.pep}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="ext">
                        <StyledInput
                            id="ext"
                            type="text"
                            name="ext"
                            placeholder="ext"
                            value={formState.ext}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="int">
                        <StyledInput
                            id="int"
                            type="text"
                            name="int"
                            placeholder="int"
                            value={formState.int}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="options">
                        <StyledInput
                            id="options"
                            type="text"
                            name="options"
                            placeholder="options"
                            value={formState.options}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="notes">
                        <StyledInput
                            id="notes"
                            type="text"
                            name="notes"
                            placeholder="additional notes"
                            onChange={handleChange}
                            value={formState.notes}
                        />
                    </label>
                    <div className="form-instructions">
                        <span>Don't forget to check the box</span>
                    </div>
                    <label className="checkbox">
                        <span
                            style={{
                                color: "white",
                                fontSize: "1.2rem",
                                padding: "6px",
                            }}
                        >
                            Finalize
                        </span>
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={!buttonDisabled}
                            onChange={handleChange}
                        />
                    </label>

                    <button disabled={buttonDisabled} className="button">
                        Submit
                    </button>
                </form>

                <form className="ticket-form" onSubmit={handleDriverSubmit}>
                    <div className="form-instructions">
                        <span>Complete the driver form</span>
                    </div>
                    <br />
                    <br />
                    <br />
                    <label htmlFor="">
                        <StyledInput
                            id="salesperson"
                            type="text"
                            name="salesperson"
                            placeholder="salesperson"
                            value={driverFormState.salesperson}
                            onChange={handleDriverChange}
                        />
                    </label>
                    <label>
                        <StyledTextArea
                            id="description"
                            name="description"
                            placeholder="describe your request, please include as many details as possible"
                            value={driverFormState.description}
                            onChange={handleDriverChange}
                        />
                    </label>

                    <button className="button">Submit</button>
                </form>
            </div>
        </>
    );
};

export default SwapForm;
