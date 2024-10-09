import { Box, Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';
import ResetPasswordServices from "../../services/ResetPasswordServices";
import CustomAlert from "../../components/CustomAlert";



export default () => {

    const [validEmail, setValidEmail] = useState(false);
    const [alert, setAlert] = useState({ type: null, message: null });
    const { resetPassword, confirmPassword } = ResetPasswordServices();
    const formikEmail = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Tiene que ser un email valido").required("Email requerido"),
        }),
        onSubmit: values => {
            (async () => {
                let response = await resetPassword(values.email);
                if (response.code === 200) {
                    setValidEmail(true);
                }
                setAlert({ type: response.code !== 200 ? "error" : "success", message: response.code + " " + response.message });
                setTimeout(() => { setAlert({ type: null, message: null }) }, 3000);
            })()
        }
    });

    const formikCode = useFormik({
        initialValues: {
            code: "",
            password: "",
            passwordRepeat: ""
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Codigo requerido"),
            password: Yup.string().required("Contraseña requerida"),
            passwordRepeat: Yup.string().required("Contraseña requerida"),
        }),
        onSubmit: values => {
            if(values.password === values.passwordRepeat) {
              ( async ()=> {
                let response =  await confirmPassword(values.code, values.password);
                if(response.code === 200) {

                } 
                setAlert({ type: response.code !== 200 ? "error" : "success", message: response.code + " " + response.message });
                setTimeout(() => { setAlert({ type: null, message: null }) }, 3000);
            })()

            } else {
                setAlert({ type: "error", message: "La contraseña no coiciden" });
                setTimeout(() => { setAlert({ type: null, message: null }) }, 3000);
            }
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
                {alert.type !== null ? <CustomAlert type={alert.type} message={alert.message} /> : null}
            </Box>

            {validEmail ? <Box
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
                <TextField
                    id="password"
                    label="Contraseña"
                    type="password"
                    value={formikCode.values.password}
                    onChange={formikCode.handleChange}
                    error={formikCode.errors.password ? true : false}
                    helperText={formikCode.errors.password}
                    sx={{ marginBottom: 2 }}
                    variant="outlined" />
                <TextField
                    id="passwordRepeat"
                    label="Repita contraseña"
                    type="password"
                    value={formikCode.values.passwordRepeat}
                    onChange={formikCode.handleChange}
                    error={formikCode.errors.passwordRepeat ? true : false}
                    helperText={formikCode.errors.passwordRepeat}
                    sx={{ marginBottom: 2 }}
                    variant="outlined" />
                <Button type="submit" variant="contained">Confirmar</Button>
            </Box> : null}
        </Paper>
    </Box>);
}