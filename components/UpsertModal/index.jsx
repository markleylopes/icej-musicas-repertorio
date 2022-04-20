import {
  Grid,
  Dialog,
  Button,
  MenuItem,
  TextField,
  IconButton,
  DialogTitle,
  DialogContent,
  LinearProgress,
} from "@mui/material";
import { tones } from "constants";
import { useUpsert } from "./useUpsert";
import { Add, Edit, Delete } from "@mui/icons-material";

export const UpsertModal = ({ mode = "add", initialId, initialMusicValue }) => {
  const {
    open,
    loading,
    musicFormValues,
    setOpen,
    onSubmit,
    onDelete,
    onChangeValue,
  } = useUpsert({
    initialId,
    initialMusicValue,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} size="small" color="inherit">
        {mode === "add" ? <Add /> : <Edit fontSize="small" />}
      </IconButton>
      {mode !== "add" && (
        <IconButton
          onClick={() => onDelete(initialId)}
          size="small"
          color="inherit"
        >
          <Delete fontSize="small" />
        </IconButton>
      )}
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Música</DialogTitle>
          <DialogContent>
            <Grid
              paddingTop={1}
              component="form"
              onSubmit={onSubmit}
              container
              spacing={2}
            >
              <Grid item xs={8}>
                <TextField
                  disabled={loading}
                  inputProps={{
                    required: true,
                  }}
                  fullWidth
                  label="Nome"
                  value={musicFormValues.title}
                  onChange={onChangeValue}
                  name="title"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  disabled={loading}
                  select
                  inputProps={{
                    required: true,
                  }}
                  fullWidth
                  label="Tom"
                  value={musicFormValues.tone}
                  onChange={onChangeValue}
                  name="tone"
                >
                  {tones.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={loading}
                  fullWidth
                  label="Link da música"
                  inputProps={{
                    required: true,
                    type: "url",
                    title: "Digite um link válido",
                  }}
                  value={musicFormValues.link}
                  onChange={onChangeValue}
                  name="link"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={loading}
                  inputProps={{
                    title: "Digite um link válido",
                  }}
                  fullWidth
                  label="Link da cifra"
                  value={musicFormValues.musicSheetLink}
                  onChange={onChangeValue}
                  name="musicSheetLink"
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button disabled={loading} onClick={handleClose}>
                  Cancelar
                </Button>
                <Button disabled={loading} type="submit">
                  Salvar
                </Button>
              </Grid>
            </Grid>
            {loading && <LinearProgress />}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
