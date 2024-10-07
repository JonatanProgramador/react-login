import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from 'yup';
import UserServices from "../../services/UserServices";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import CustomAlert from "../../components/CustomAlert";
import { setCookie, deleteCookie, checkCookies } from "../../utils/cookies";

export default function Login() {

  const { login } = UserServices();

  const { setUser } = useContext(UserContext);
  const [alert, setAlert] = useState({ type: null, message: null });

  useEffect(() => { setUser(checkCookies()) }, []);




  const formik = useFormik({
    initialValues: {
      name: "",
      password: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nombre requerido"),
      password: Yup.string().required("Contraseña requeria")
    }),
    onSubmit: values => {
      (async () => {
        let response = await login(values.name, values.password);
        if (response.code === 200) {
          deleteCookie("token");
          deleteCookie("id");
          deleteCookie("rol");
          setCookie("token", response.data.token, { "max-age": 180 });
          setCookie("id", response.data.id, { "max-age": 180 });
          setCookie("rol", response.data.rol, { "max-age": 180 });
          setUser(true);
          formik.resetForm();
        } else {
          setAlert({ type: "error", message: response.code + " " + response.message });
          setTimeout(() => { setAlert({ type: null, message: null }) }, 3000);
        }
      })();
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
        sx={{ padding: 3, width: "fit-content" }}
      >
        <Box
          component={"form"}
          display={"flex"}
          flexDirection={"column"}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="name"
            label="Nombre"
            error={formik.errors.name ? true : false}
            helperText={formik.errors.name}
            value={formik.values.name}
            onChange={formik.handleChange}
            sx={{ marginBottom: 2 }}
            variant="outlined" />
          <TextField
            id="password"
            error={formik.errors.password ? true : false}
            helperText={formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
            sx={{ marginBottom: 2 }}
            label="Contraseña"
            variant="outlined" />
          <Button
            sx={{ marginBottom: 2 }}
            variant="contained"
            type="submit"
          >Entrar</Button>
          <Typography
            component={Link}
            sx={{ textDecoration: "none", color: "black" }}
            align="center"
            to="resetearPassword">
            Recuperar contraseña</Typography>
          {alert.type !== null ? <CustomAlert type={alert.type} message={alert.message} /> : null}
        </Box>
      </Paper>
    </Box>
  );
}