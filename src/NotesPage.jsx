import React, { useEffect, useState } from "react";
import UpgradeButton from "./UpgradeButton";

export default function NotesPage({ token, setToken, userId }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  async function fetchNotes() {
    const res = await fetch("https://saas-notes-l02w.onrender.com/notes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNotes(data);
  }

  async function createNote() {
    try {
      const res = await fetch("https://saas-notes-l02w.onrender.com/notes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error(await res.text());
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteNote(id) {
    try {
      const res = await fetch(
        `https://saas-notes-l02w.onrender.com/notes/user/${userId}/note/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error(await res.text());
      fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateNote(id) {
    try {
      const res = await fetch(
        `https://saas-notes-l02w.onrender.com/notes/user/${userId}/note/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      setTitle("");
      setContent("");
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Your Notes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            minHeight: "80px",
          }}
        />
        <button
          onClick={createNote}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add Note
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              background: "#f9f9f9",
            }}
          >
            {editingId === note.id ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginBottom: "6px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginBottom: "6px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  onClick={() => updateNote(note.id)}
                  style={{
                    background: "orange",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  style={{
                    background: "gray",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h4>{note.title}</h4>
                <p>{note.content}</p>
                <button
                  onClick={() => deleteNote(note.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditingId(note.id);
                    setTitle(note.title);
                    setContent(note.content);
                  }}
                  style={{
                    background: "orange",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Update
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <UpgradeButton token={token} />

      <button
        onClick={() => setToken(null)}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "10px",
          background: "gray",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
