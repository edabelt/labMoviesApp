import React, {
  MouseEvent,
  useContext,
  useState,
} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { AuthContext } from "../../contexts/authContext";
import { supabase } from "../../supabaseClient";

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(
  ({ theme }) => theme.mixins.toolbar
);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("lg")
  );

  const publicOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Actors", path: "/actors" },
  ];

  const authenticatedOptions = [
    {
      label: "Favorites",
      path: "/movies/favourites",
    },
    {
      label: "Favorite Actors",
      path: "/actors/favourites",
    },
    {
      label: "Log Out",
      path: "/logout",
    },
  ];

  const guestOptions = [
    { label: "Sign Up", path: "/signup" },
    { label: "Log In", path: "/login" },
  ];

  const menuOptions = user
    ? [...publicOptions, ...authenticatedOptions]
    : [...publicOptions, ...guestOptions];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAnchorEl(null);
    navigate("/");
  };

  const handleMenuSelect = (pageURL: string) => {
    if (pageURL === "/logout") {
      handleLogout();
      return;
    }

    navigate(pageURL);
    setAnchorEl(null);
  };

  const handleMenu = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const displayName =
    user?.user_metadata.full_name ||
    user?.email?.split("@")[0];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>

          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>

          {user && (
            <Typography
              variant="body1"
              sx={{ marginRight: 2 }}
            >
              Hello, {displayName}
            </Typography>
          )}

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((option) => (
                  <MenuItem
                    key={option.label}
                    onClick={() =>
                      handleMenuSelect(option.path)
                    }
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((option) => (
                <Button
                  key={option.label}
                  color="inherit"
                  onClick={() =>
                    handleMenuSelect(option.path)
                  }
                >
                  {option.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Offset />
    </>
  );
};

export default SiteHeader;