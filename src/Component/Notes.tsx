import React, { useState } from "react";
import "./Notes.css";

type Note = {
  id: number;
  title: string;
  content: string;
};
const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "title1",
      content: "content1",
    },
    {
      id: 2,
      title: "title1",
      content: "content2",
    },
    {
      id: 3,
      title: "title3",
      content: "content3",
    },
    {
      id: 4,
      title: "title4",
      content: "content4",
    },
    {
      id: 5,
      title: "title5",
      content: "content5",
    },
    {
      id: 6,
      title: "title6",
      content: "content6",
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };
  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNote) {
      return;
    }
    const updateNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };
    const updateNoteList = notes.map((note) =>
      note.id === selectedNote.id ? updateNote : note
    );
    setNotes(updateNoteList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancle = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    const updateNotes = notes.filter((note) => note.id !== id);
    setNotes(updateNotes);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };
  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(e) => (selectedNote ? handleUpdateNote(e) : handleSubmit(e))}
      >
        <input
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          rows={10}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {selectedNote ? (
          <div className="edit-button">
            <button type="submit">Save</button>
            <button onClick={handleCancle}>Cancle</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((notes) => {
          return (
            <div className="notes-item" onClick={() => handleNoteClick(notes)}>
              <div className="notes-header">
                <button onClick={(e) => deleteNote(e, notes.id)}>X</button>
              </div>
              <h2 style={{ margin: 0 }}>{notes.title}</h2>
              <p>{notes.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
