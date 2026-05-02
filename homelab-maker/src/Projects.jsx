import React, { useState } from "react";
export default function Projects({ projects, onAdd, error, onProjectClick }) {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    onAdd(newName.trim());
    setNewName("");
    setShowModal(false);
  };

  return (
    <section>
      <h2>Projects</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
        {projects.map((p) => (
          <input
            key={p}
            type="text"
            value={p}
            readOnly
            className="project-textbox"
            style={{ background: "#fff" }}
            onClick={() => onProjectClick && onProjectClick(p)}
          />
        ))}
      </div>
      <button onClick={() => setShowModal(true)} title="Add project" style={{ marginTop: 16, fontSize: 24, width: 40, height: 40, borderRadius: 20 }}>+</button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Project</h3>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Project name"
              style={{ width: "100%", marginBottom: 12 }}
              autoFocus
            />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleAdd} style={{ fontWeight: "bold" }}>Add</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
