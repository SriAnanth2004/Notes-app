import React, { useState } from "react";
import "./App.css";
import Notes from "./assets/Popup";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isPopupOpen, setisPopupOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [isMainOpen, setisMainOpen] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);

  const addNotes = (note) => {
    setNotes([...notes, note]);
  };

  const updateNote = (updatedNote, index) => {
    const newNotes = notes.map((note, i) => (i === index ? updatedNote : note));
    setNotes(newNotes);
    setEditingIndex(null);
  };

  const deleteNote = (index) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const newNotes = notes.filter((_, i) => i !== index);
      setNotes(newNotes);
      if (editingIndex === index) {
        setEditingIndex(null);
      }
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleExit = () => {
    setEditingIndex(null);
  };

  return (
    <>
      <Container className="Main Page">
        {isMainOpen && (
          <Grid
            container
            alignItems="center"
            textAlign={"center"}
            direction="column"
          >
            <Typography variant="h3">My Notes</Typography>
            <Button
              sx={{ margin: 2, height: 80, width: 200 }}
              variant="contained"
              onClick={() => {
                setisPopupOpen(true);
                setCurrentNote(null);
                setisMainOpen(false);
              }}
            >
              Add new note
            </Button>
            <Grid container justifyContent="flex-start" alignItems="flex-start">
              {notes.map((note, index) => (
                <Grid
                  container
                  boxShadow={9}
                  sx={{
                    margin: 2,
                    height: 350,
                    width: 350,
                  }}
                  key={index}
                >
                  <Grid
                    container
                    marginTop={2}
                    marginLeft={2}
                    marginRight={2}
                    direction={"column"}
                    textAlign={"left"}
                  >
                    <Typography>Title</Typography>
                    <textarea
                      className="inputHolder"
                      value={note.input}
                      onChange={(e) => {
                        if (index === editingIndex) {
                          const newNotes = [...notes];
                          newNotes[index].input = e.target.value;
                          setNotes(newNotes);
                        }
                      }}
                      disabled={editingIndex !== index}
                      rows="1"
                      cols="30"
                    ></textarea>
                  </Grid>

                  <Grid
                    container
                    marginBottom={2}
                    marginLeft={2}
                    marginRight={2}
                    direction={"column"}
                    textAlign={"left"}
                  >
                    <Typography>Description</Typography>
                    <textarea
                      className="descriptionHolder"
                      value={note.description}
                      onChange={(e) => {
                        if (index === editingIndex) {
                          const newNotes = [...notes];
                          newNotes[index].description = e.target.value;
                          setNotes(newNotes);
                        }
                      }}
                      disabled={editingIndex !== index}
                      rows="8"
                      cols="30"
                    ></textarea>
                  </Grid>

                  {editingIndex !== index ? (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      padding={2}
                    >
                      <Button
                        variant="outlined"
                        aria-label="edit"
                        onClick={() => handleEdit(index)}
                      >
                        <EditIcon />
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        size="inherit"
                        onClick={() => deleteNote(index)}
                      >
                        {<DeleteIcon />}
                      </Button>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      padding={2}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => updateNote(notes[index], index)}
                      >
                        Save
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleExit}
                      >
                        Exit
                      </Button>
                    </Grid>
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        {isPopupOpen && (
          <Notes
            onClose={() => {
              setisPopupOpen(false);
              setisMainOpen(true);
            }}
            onSave={(note) => {
              if (currentNote) {
                updateNote(note, currentNote.index);
              } else {
                addNotes(note);
              }
              setisPopupOpen(false);
              setisMainOpen(true);
            }}
            note={currentNote}
          />
        )}
      </Container>
    </>
  );
};

export default App;
