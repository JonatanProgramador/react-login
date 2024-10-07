import { Box, Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';



export default () => {

    const [validEmail, setValidEmail] = useState(false);
    const formikEmail = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Tiene que ser un email valido").required("Email requerido"),
        }),
        onSubmit: values => {
            console.log(values.email);
            setValidEmail(true);
        }
    });

    const formikCode = useFormik({
        initialValues: {
            code: "",
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Codigo requerido"),
        }),
        onSubmit: values => {
            console.log(values.code);
        }
    });

    return (<Box
        height={"90vh"}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
    >
        <Paper
            elevation={3}
            sx={{ width: "fit-content", padding: 3 }}>
            <Box
                component={"form"}
                display={"flex"}
                flexDirection={"column"}
                onSubmit={formikEmail.handleSubmit}>

                <TextField
                    id="email"
                    label="Email"
                    disabled={validEmail}
                    value={formikEmail.values.email}
                    onChange={formikEmail.handleChange}
                    error={formikEmail.errors.email ? true : false}
                    helperText={formikEmail.errors.email}
                    sx={{ marginBottom: 2 }}
                />
                <Button disabled={validEmail} type="submit" variant="contained">Enviar</Button>
            </Box>

            {validEmail?<Box
                component={"form"}
                display={"flex"}
                flexDirection={"column"}
                marginTop={10}
                onSubmit={formikCode.handleSubmit}>
                     <TextField
                    id="code"
                    label="Codigo"
                    value={formikCode.values.code}
                    onChange={formikCode.handleChange}
                    error={formikCode.errors.code ? true : false}
                    helperText={formikCode.errors.code}
                    sx={{ marginBottom: 2 }}
                />
                <Button type="submit" variant="contained">Confirmar</Button>
            </Box>:null}
        </Paper>
    </Box>);
}