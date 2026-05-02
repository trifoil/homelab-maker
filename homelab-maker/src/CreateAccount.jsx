/**
 * CreateAccount component for user registration
 */

import { useState } from "react";

function CreateAccount({ onNavigate, onRegister, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords do not match");
    onRegister(username, password);
  };

  return (
    <main className="container">
      <h1>Create Account</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form style={{ maxWidth: "400px", margin: "2em auto" }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1em" }}>
          <label htmlFor="username" style={{ display: "block", marginBottom: "0.5em" }}>
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Choose a username"
            style={{ width: "100%", padding: "0.5em", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "0.5em" }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Create a password"
            style={{ width: "100%", padding: "0.5em", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: "0.5em" }}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Confirm your password"
            style={{ width: "100%", padding: "0.5em", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ display: "flex", gap: "1em", justifyContent: "center" }}>
          <button type="submit" style={{ margin: "0 1em" }}>
            Register
          </button>
          <button
            type="button"
            onClick={() => onNavigate("home")}
            style={{ margin: "0 1em" }}
          >
            Back
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateAccount;
