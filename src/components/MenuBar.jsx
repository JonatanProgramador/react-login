import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import MenuIcon from '@mui/icons-material/Menu';

export default function MenuBar() {

  const { user } = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <AppBar component={"nav"}
      sx={{ position: "static" }}>
      <Toolbar>

        <Typography
          flexGrow={1}
          variant="h6">Logo
        </Typography>

        <Box
          sx={{ display: { xs: "none", sm: "block" } }}>
            {user?.name !== undefined ? <Typography
          variant="h6"
          component={Link}
          to={"/dashboard"}
          sx={{ textDecoration: "none", color: "white" }}
          marginRight={2}>DashBoard
        </Typography> : null}
        
          <Typography
            variant="h6"
            component={Link}
            to={"/registrar"}
            sx={{ textDecoration: "none", color: "white" }}
            marginRight={2}>Registrar
          </Typography>

          <Typography
            variant="h6"
            component={Link}
            to={"/"}
            sx={{ textDecoration: "none", color: "white" }}
          >Login
          </Typography>
        </Box>

        <Box
          sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={(event) => setOpenMenu(openMenu === null ? event.currentTarget : null)}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Menu
          id="menu-appbar"
          anchorEl={openMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(openMenu)}
          onClose={() => setOpenMenu(null)}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuItem
          onClick={() => setOpenMenu(null)}>
            <Typography
              variant="h6"
              component={Link}
              to={"/registrar"}
              sx={{ textDecoration: "none", width: "100%", color: "black"}}
              marginRight={2}>Registrar
            </Typography>
          </MenuItem>

          <MenuItem
          onClick={() => setOpenMenu(null)}>
            <Typography
              variant="h6"
              component={Link}
              to={"/"}
              sx={{ textDecoration: "none", width: "100%", color: "black" }}
            >Login
            </Typography>
          </MenuItem>

          {user?.name !== undefined ? <MenuItem
          onClick={() => setOpenMenu(null)}>
            <Typography
              variant="h6"
              component={Link}
              to={"/dashboard"}
              sx={{ textDecoration: "none", width: "100%", color: "black" }}
            >DashBoard
            </Typography>
          </MenuItem>:null}
        </Menu>

      </Toolbar>
    </AppBar>
  );
}