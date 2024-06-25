import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const Notes = ({ onClose, onSave, note }) => {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (note) {
      setInput(note.input || "");
      setDescription(note.description || "");
    }
  }, [note]);

  const handleSave = () => {
    onSave({ input, description });
  };

  return (
    <Grid container direction={"column"} maxWidth="sm" className="newPopup">
      <Typography marginTop={4} marginBottom={4} variant="h4">
        {note ? "Edit Note" : "New Note"}
      </Typography>
      <Grid container marginBottom={3}>
        <TextField
          inputProps={{ style: { fontSize: 25 } }}
          InputLabelProps={{ style: { fontSize: 25 } }}
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          label="Title"
          spellCheck="false"
        />
      </Grid>

      <Grid container marginBottom={3}>
        <TextField
          sx={{ width: 350 }}
          inputProps={{ style: { fontSize: 20 } }}
          InputLabelProps={{ style: { fontSize: 20 } }}
          variant="outlined"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          spellCheck="false"
        ></TextField>
      </Grid>

      <Grid container direction={"row"}>
        <Grid>
          <Button variant="outlined" color="success" onClick={handleSave}>
            Save
          </Button>
        </Grid>
        <Grid>
          <Button variant="outlined" color="error" onClick={onClose}>
            Exit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Notes;
