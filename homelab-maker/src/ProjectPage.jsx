import React from "react";

/**
 * ProjectPage displays details for a single project.
 * @param {Object} props
 * @param {string} props.projectName - The name of the project to display
 */
export default function ProjectPage({ projectName }) {
  // Placeholder for future project details, tasks, etc.
  return (
    <section>
      <h2>Project: {projectName}</h2>
      <div style={{ marginTop: 24 }}>
        <p>This is the project page for <b>{projectName}</b>.</p>
        {/* Add project-specific content here */}
      </div>
    </section>
  );
}