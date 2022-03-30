import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { CustomAppBar } from "components/CustomAppBar";
import { CustomLayoutGrid } from "./styles";

export const MainLayout = ({ children }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <CustomLayoutGrid height={height}>
      <CustomAppBar />
      <Grid item container xs={12} justifyContent="center" alignItems="center">
        {children}
      </Grid>
    </CustomLayoutGrid>
  );
};
