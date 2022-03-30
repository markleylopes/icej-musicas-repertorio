import {
  Box,
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuthentication } from "hooks/useAuthentication";

export const CustomAppBar = () => {
  const { user, logout } = useAuthentication();
  const router = useRouter();

  console.log("user: ", user);
  return (
    <Box>
      <AppBar sx={{ height: "56px" }} elevation={0} position="static">
        <Toolbar
          disableGutters={true}
          sx={{
            height: "56px",
            padding: "0 16px !important",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div">
            Músicas
          </Typography>
          {user && (
            <div>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                size="small"
                onClick={logout}
                aria-label="menu"
              >
                <LogoutIcon />
              </IconButton>
            </div>
          )}
          {!user && (
            <div>
              <Button variant="link" onClick={() => router.push("/login")}>
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
