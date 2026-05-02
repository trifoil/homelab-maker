/**
 * Login component for user authentication
 */

import { useState } from "react";

function Login({ onNavigate, onLogin, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <main className="container">
      <h1>Login</h1>
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
            placeholder="Enter your username"
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
            placeholder="Enter your password"
            style={{ width: "100%", padding: "0.5em", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ display: "flex", gap: "1em", justifyContent: "center" }}>
          <button type="submit" style={{ margin: "0 1em" }}>
            Sign In
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

export default Login;
