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
import { CustomToolbar } from "./styles";
import { useAuthentication } from "hooks/useAuthentication";

export const CustomAppBar = () => {
  const { isLogged, logout } = useAuthentication();
  const router = useRouter();

  return (
    <Box>
      <AppBar sx={{ height: "56px" }} elevation={0} position="static">
        <CustomToolbar
          disableGutters={true}
          
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
                variant="text"
                onClick={() => router.push(router.pathname !== "/login" ? "/login" : "/")}
              >
                {router.pathname !== "/login" ? "Login" : "Voltar"}
              </Button>
            </div>
          )}
        </CustomToolbar>
      </AppBar>
    </Box>
  );
};
