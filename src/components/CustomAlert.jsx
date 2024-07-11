import { Alert } from "@mui/material";
import React from "react";

export default function CustomAlert({type, message}) {
    return <Alert severity={type}>{message}</Alert>
}