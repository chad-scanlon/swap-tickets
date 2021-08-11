import * as yup from "yup";

export const formSchema = yup.object().shape({
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
