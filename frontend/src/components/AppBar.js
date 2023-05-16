import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import "./Navbar.css";
import AccountMenu from "./AccountMenu";
import { Link, useLocation } from "react-router-dom";

const pages = [
  { id: 1, name: "Docs", path: "/docs", target: "", rel: "" },
  {
    id: 2,
    name: "API",
    path: "/api",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

const ResponsiveAppBar = () => {
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 8,
              display: { xs: "none", md: "flex" },
              color: "white",
              textDecoration: "none",
            }}
          >
            <p
              style={{
                backgroundColor: "#0385B0",
                paddingLeft: "2%",
                paddingRight: "2%",
                borderRadius: "10%",
              }}
            >
              FM
            </p>
            <p style={{ width: "100px", marginLeft: "10px" }}>deploy</p>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "white" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.id}
                  component={Link}
                  to={page.path}
                  target={page.target}
                  rel={page.rel}
                  onClick={handleCloseNavMenu}
                >
                  {page.path === location.pathname ? (
                    <Typography textAlign="center" color="primary">
                      {page.name}
                    </Typography>
                  ) : (
                    <Typography textAlign="center">{page.name}</Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "white",
              textDecoration: "none",
            }}
          >
            <p
              style={{
                backgroundColor: "#0385B0",
                paddingLeft: "2%",
                paddingRight: "2%",
                borderRadius: "10%",
              }}
            >
              FM
            </p>
            <p style={{ width: "100px", marginLeft: "10px" }}>deploy</p>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <div key={page.id}>
                {page.path === location.pathname ? (
                  <Button
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.path}
                    target={page.target}
                    rel={page.rel}
                    sx={{
                      my: 2,
                      color: "#51ADCE",
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    <Typography textAlign="center" sx={{ fontWeight: "bold" }}>
                      {page.name}
                    </Typography>
                  </Button>
                ) : (
                  <Button
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.path}
                    target={page.target}
                    rel={page.rel}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </Button>
                )}
              </div>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <AccountMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
