import { Link, Card, Grid, Typography, CardContent } from "@mui/material";

export const Title = ({ value }) => (
  <span
    style={{
      fontWeight: "bold",
    }}
  >
    {value}:{" "}
  </span>
);

export const MusicListItem = ({
  title = "",
  tone = "",
  link = "",
  musicSheetLink = "",
}) => {
  const links = [link];
  return (
    <Card elevation={0}>
      <CardContent
        component={Grid}
        sx={{ paddingBottom: "16px !important" }}
        spacing={2}
        container
      >
        <Grid item xs={8} display="flex">
          <Typography fontWeight="bold" variant="body1" component="div">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography textAlign="right" variant="body1" bold component="div">
            <Title value="Tom" />
            {tone}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {links.map((i) => (
            <Link key={i} href={i} target="_blank" display="block">
              Ouvir música
            </Link>
          ))}
        </Grid>
        {musicSheetLink && (
          <Grid item xs={6} display="flex" justifyContent="flex-end">
            <Link href={musicSheetLink} target="_blank" display="block">
              Ver cifra
            </Link>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};
