


import { useState } from "react";
import "./App.css";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import { registerUser, loginUser, loadUserData, saveUserData } from "./tauri-frontend";

import Projects from "./Projects";
import ProjectPage from "./ProjectPage";





function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null); // { username, password }
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  // Load projects after login
  const loadProjects = async (username, password) => {
    setLoadingProjects(true);
    setError("");
    try {
      const raw = await loadUserData(username, password);
      if (raw && raw.length > 0) {
        const decoded = new TextDecoder().decode(Uint8Array.from(raw));
        setProjects(JSON.parse(decoded));
      } else {
        setProjects([]);
      }
    } catch (e) {
      setProjects([]); // treat as no projects if not found
    } finally {
      setLoadingProjects(false);
    }
  };

  const saveProjects = async (username, password, projectsList) => {
    const encoded = new TextEncoder().encode(JSON.stringify(projectsList));
    await saveUserData(username, password, Array.from(encoded));
  };

  const handleLogin = async (username, password) => {
    setError("");
    try {
      const ok = await loginUser(username, password);
      if (ok) {
        setUser({ username, password });
        setCurrentPage("home");
        await loadProjects(username, password);
      } else {
        setError("Invalid username or password");
      }
    } catch (e) {
      setError("Login failed: " + e);
    }
  };

  const handleRegister = async (username, password) => {
    setError("");
    try {
      await registerUser(username, password);
      setCurrentPage("login");
    } catch (e) {
      setError("Registration failed: " + e);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setProjects([]);
    setCurrentPage("home");
  };

  const handleAddProject = async (name) => {
    setError("");
    if (projects.includes(name)) {
      setError("Project name already exists");
      return;
    }
    const newProjects = [...projects, name];
    setProjects(newProjects);
    try {
      await saveProjects(user.username, user.password, newProjects);
    } catch (e) {
      setError("Failed to save project: " + e);
    }
  };

  if (currentPage === "login") {
    return <Login onNavigate={setCurrentPage} onLogin={handleLogin} error={error} />;
  }
  if (currentPage === "createAccount") {
    return <CreateAccount onNavigate={setCurrentPage} onRegister={handleRegister} error={error} />;
  }
  if (user) {
    if (activeProject) {
      return (
        <main className="container">
          <button onClick={() => setActiveProject(null)} style={{ marginBottom: 16 }}>&larr; Back to Projects</button>
          <ProjectPage projectName={activeProject} />
        </main>
      );
    }
    return (
      <main className="container">
        <h1>Welcome, {user.username}!</h1>
        <button onClick={handleLogout}>Logout</button>
        <hr />
        {loadingProjects ? (
          <div>Loading projects...</div>
        ) : (
          <Projects
            projects={projects}
            onAdd={handleAddProject}
            error={error}
            onProjectClick={setActiveProject}
          />
        )}
      </main>
    );
  }
  return (
    <main className="container">
      <h1>Login</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="row" style={{ justifyContent: "center", margin: "2em 0" }}>
        <button onClick={() => setCurrentPage("createAccount")} style={{ margin: "0 1em" }}>
          Create Account
        </button>
        <button onClick={() => setCurrentPage("login")} style={{ margin: "0 1em" }}>
          Login
        </button>
      </div>
    </main>
  );
}

export default App;
