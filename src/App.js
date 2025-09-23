import React, { useState } from "react";
import LoginPage from "./LoginPage";
import NotesPage from "./NotesPage";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {token ? (
        <NotesPage token={token} setToken={setToken} />
      ) : (
        <LoginPage setToken={setToken} />
      )}
    </div>
  );
}
