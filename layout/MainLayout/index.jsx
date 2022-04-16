/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { CustomAppBar } from "components/CustomAppBar";
import { CustomLayoutGrid } from "./styles";

export const MainLayout = ({ children }) => {

  return (
    <CustomLayoutGrid>
      <CustomAppBar />
      <Grid item container xs={12} justifyContent="center" alignItems="center">
        {children}
      </Grid>
    </CustomLayoutGrid>
  );
};
