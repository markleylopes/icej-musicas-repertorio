import {
  Box,
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { UpsertModal } from "components/UpsertModal";
import { useAuthentication } from "hooks/useAuthentication";

export const CustomAppBar = () => {
  const { isLogged, logout } = useAuthentication();
  const router = useRouter();

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
          {isLogged && (
            <div style={{ display: "flex", gap: 10 }}>
              <UpsertModal />
              <IconButton
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
          {!isLogged && (
            <div>
              <Button
                variant="link"
                onClick={() => router.push(router.pathname !== "/login" ? "/login" : "/")}
              >
                {router.pathname !== "/login" ? "Login" : "Voltar"}
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
