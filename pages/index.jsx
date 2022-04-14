/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import { Fragment } from "react";
import { MainLayout } from "layout/MainLayout";
import { MusicListItem } from "components/MusicListItem";
import { Grid, TextField, Divider } from "@mui/material";
import { useMusicsState } from "../hooks/useMusicsState";

export default () => {
  const { filteredMusics, filter, onSetFilter } = useMusicsState();

  return (
    <MainLayout>
      <Grid item xs={10} sm={8} md={6} lg={4} container spacing={1}>
        <Grid item xs={12} display="flex">
          <TextField
            fullWidth
            placeholder="Buscar Música"
            value={filter}
            onChange={({ target }) => onSetFilter(target.value)}
            InputProps={{
              style: {
                background: "white",
              },
            }}
            size="small"
          />
        </Grid>

        <Grid item xs={12} container>
          <div
            style={{
              height: "80vh",
              padding: 1,
              overflowY: "auto",
              width: "100%",
            }}
          >
            {filteredMusics.map((i) => (
              <Fragment key={i.title}>
                <MusicListItem
                  title={i.title}
                  id={i.id}
                  link={i.link}
                  tone={i.tone}
                  musicSheetLink={i.musicSheetLink}
                />
                <Divider variant="middle" />
              </Fragment>
            ))}
          </div>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
