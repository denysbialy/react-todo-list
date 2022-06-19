import * as yup from "yup";

export const notEmpty = yup.object({
    notate: yup.string().trim().required('You cannot add an empty note'),
});
