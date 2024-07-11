import { Box, Paper, TextField } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";


export default function Dashboard() {

    const {user} = useContext(UserContext);

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
    );
}