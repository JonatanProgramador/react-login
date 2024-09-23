import { Box, Paper, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import UserServices from "../../services/UserServices";
import { getCookie, checkCookies } from "../../utils/cookies";


export default function Dashboard() {

    const [data, setData] = useState();
    const { showUser } = UserServices();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        if (checkCookies()) {
            (async () => {
                let response = await showUser(getCookie("id"), getCookie("token"));
                setData(response.data)
            })()
        } else {
            setUser(false);
        }
    }, [])

    return data ? (<Box
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
                    defaultValue={data.name}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ marginBottom: 2 }}
                />

                <TextField
                    id="email"
                    label="Email"
                    defaultValue={data.email}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ marginBottom: 2 }}
                />

                <TextField
                    id="message"
                    label="Mensaje"
                    defaultValue={data.message}
                    sx={{ marginBottom: 2 }}
                    multiline
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <TextField
                    id="rols"
                    label="Roles"
                    defaultValue={data.rols}
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