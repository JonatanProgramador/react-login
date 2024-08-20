import { Box, Paper, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import UserServices from "../../services/UserServices";
import { getCookie } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {

    const [user, setUser] = useState();
    const { login, getUser } = UserServices();
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie("id") && getCookie("token")) {
            (async () => {
                let response = await getUser(getCookie("id"), getCookie("token"));
                setUser(response.data)
            })()
        } else {
            navigate("/");
        }
    }, [])

    return user ? (<Box
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
                component={"div"}
                display={"flex"}
                flexDirection={"column"}>
                <TextField
                    id="name"
                    label="Nombre"
                    defaultValue={user.name}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ marginBottom: 2 }}
                />

                <TextField
                    id="message"
                    label="Mensaje"
                    defaultValue={user.message}
                    sx={{ marginBottom: 2 }}
                    multiline
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Box>
        </Paper>
    </Box>
    ) : null;
}