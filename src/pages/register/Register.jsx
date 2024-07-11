import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';
import UserServices from "../../services/UserServices";
import CustomAlert from "../../components/CustomAlert";

export default function Register() {

  const userServices = UserServices();
  const [alert, setAlert] = useState({ type: null, message: null });

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      passwordRepeat: "",
      message: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nombre requerido"),
      password: Yup.string().required("Contraseña requerida"),
      passwordRepeat: Yup.string().required("Contraseña requerida")
    }),
    onSubmit: values => {
      (async () => {
        if (values.password === values.passwordRepeat) {
          let response = await userServices.register(values);
          setAlert({type: response.code !== 200?"error":"success", message: response.code+" "+response.message});
        } else {
          setAlert({ type: "error", message: "No coincide la contraseña" });
        }
        setTimeout(() => { setAlert({ type: null, message: null }) }, 3000);
      })()
    }
  });

  return (
    <Box
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
          onSubmit={formik.handleSubmit}
          display={"flex"}
          flexDirection={"column"}>
          <Typography
            variant="h6"
            textAlign={"center"}
            color={"#1976d2"}
            fontWeight={"bold"}
            marginBottom={2}>
            Registrar</Typography>
          <TextField
            id="name"
            label="Nombre"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name ? true : false}
            helperText={formik.errors.name}
            sx={{ marginBottom: 2 }}
            variant="outlined" />
          <TextField
            id="password"
            label="Contraseña"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password ? true : false}
            helperText={formik.errors.password}
            sx={{ marginBottom: 2 }}
            variant="outlined" />
          <TextField
            id="passwordRepeat"
            label="Repita contraseña"
            type="password"
            value={formik.values.passwordRepeat}
            onChange={formik.handleChange}
            error={formik.errors.passwordRepeat ? true : false}
            helperText={formik.errors.passwordRepeat}
            sx={{ marginBottom: 2 }}
            variant="outlined" />
          <TextField
            id="message"
            label="Mensaje"
            value={formik.values.message}
            onChange={formik.handleChange}
            placeholder="Placeholder"
            sx={{ marginBottom: 2 }}
            multiline
          />
          <Button type="submit" variant="contained">Registrar</Button>
          {alert.type !== null ? <CustomAlert type={alert.type} message={alert.message} /> : null}
        </Box>
      </Paper>
    </Box>
  );
}