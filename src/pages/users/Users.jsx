import React, { useContext, useEffect, useState } from "react";
import { checkCookies, getCookie } from "../../utils/cookies";
import UserServices from "../../services/UserServices";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { UserContext } from "../../context/UserContext";

export default function Users() {
    const {getUsers } = UserServices();
    const [users, setUsers] = useState();
    const {setUser} = useContext(UserContext);
    useEffect(() => {
        if (checkCookies()) {
            (async () => {
                let response = await getUsers(getCookie("token"));
                setUsers(response.data);
            })()
        } else {
            setUser(false);
        }
    }, [])

    return (users?
        <Box
        display="flex"
        justifyContent="center"
        >
    <TableContainer sx={{width: "50%", marginTop: 5}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Mensaje</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.message}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>:null);
}