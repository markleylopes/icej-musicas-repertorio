import React, { useState } from "react";
import { MainLayout } from "layout/MainLayout";
import { MusicListItem } from "components/MusicListItem";
import { Grid, TextField, Divider } from "@mui/material";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default ({ musics = [] }) => {
  const [filter, setFilter] = useState("");

  const getFiltered = (arrayValues) =>
    arrayValues.filter((i) =>
      i.title.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <MainLayout>
      <Grid item xs={10} sm={8} md={6} lg={4} container spacing={1}>
        <Grid item xs={12} display="flex">
          <TextField
            fullWidth
            placeholder="Buscar Música"
            value={filter}
            onChange={({ target }) => setFilter(target.value)}
            InputProps={{
              style: {
                background: "white",
              },
            }}
            size="small"
          />
        </Grid>

        <Grid item xs={12} comtainer>
          <div
            style={{
              height: "80vh",
              padding: 1,
              overflowY: "auto",
              width: "100%",
            }}
          >
            {getFiltered(musics).map((i) => (
              <React.Fragment key={i.title}>
                <MusicListItem
                  title={capitalizeFirstLetter(i.title.toLowerCase())}
                  link={i.link}
                  tone={i.tone}
                />
                <Divider variant="middle" />
              </React.Fragment>
            ))}
          </div>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

// export async function getStaticProps(_context) {
//   const res = await fetch(`${process.env.API_URL}/get-musics`);
//   const musics = await res.json();

//   return {
//     props: { musics },
//   };
// }
