import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function MenuBar() {

  const {user} = useContext(UserContext);

  return (
    <AppBar component={"nav"}
    sx={{position: "static"}}>
      <Toolbar>

        <Typography
          flexGrow={1}
          variant="h6">Logo
        </Typography>

        {user?.name !== undefined?<Typography
          variant="h6"
          component={Link}
          to={"/dashboard"}
          sx={{textDecoration: "none", color: "white"}}
          marginRight={2}>DashBoard
        </Typography>:null}

        <Typography
          variant="h6"
          component={Link}
          to={"/registrar"}
          sx={{textDecoration: "none", color: "white"}}
          marginRight={2}>Registrar
        </Typography>

        <Typography
          variant="h6"
          component={Link}
          to={"/"}
          sx={{textDecoration: "none", color: "white"}}
          >Login
        </Typography>

      </Toolbar>
    </AppBar>
  );
}