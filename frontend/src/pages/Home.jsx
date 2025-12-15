import { useState, useEffect } from "react";
import api from "../api";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
      })
      .catch((err) => alert(err));
    getNotes();
  };

  const createNote = (e) => {
    e.preventDefault();
    api.post("/api/notes/", { content, title }).then((res) => {
      if (res.status === 201) alert("Note Created!");
      else alert("Failed to make note.");
    });
  };
  return (
    <div>
      <div>
        <h2>Notes</h2>

      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>


      </form>
    </div>
  );
}

export default Home;
