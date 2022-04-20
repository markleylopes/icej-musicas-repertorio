/* eslint-disable react/display-name */
import { useEffect, useState } from "react";
import { auth } from "services/firebase";
import { useRouter } from "next/router";
import { MainLayout } from "layout/MainLayout";
import { HeadphonesIcon } from "svg/HeadphonesIcon";
import { useAuthentication } from "hooks/useAuthentication";
import { Button, Grid, TextField } from "@mui/material";

export default () => {
  const { login, user } = useAuthentication();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    return login(auth, userData.email, userData.password)
      .then(() => {
        router.push("/");
      })
      .catch((_err) => setError(true))
      .finally(() => {
        setLoading(false);
      });
  };

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setUserData((currentValue) => ({
      ...currentValue,
      [target.name]: target.value,
    }));

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <MainLayout>
      <Grid
        container
        item
        spacing={2}
        xs={10}
        sm={8}
        md={6}
        lg={4}
        component="form"
        onSubmit={onSubmit}
      >
        <Grid item xs={12} display="flex" justifyContent="center">
          <HeadphonesIcon />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="filled"
            disabled={loading}
            value={userData.email}
            fullWidth
            name="email"
            label="Email"
            onChange={setValue}
            error={!!error}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            type="password"
            disabled={loading}
            value={userData.password}
            onChange={setValue}
            variant="filled"
            fullWidth
            error={!!error}
            helperText={error ? "Email ou senha incorretos" : ""}
            label="Senha"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={loading}
            size="large"
            fullWidth
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
