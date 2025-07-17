import React, { useState, useEffect, useRef } from "react";
import "./Role.css";

const roles = [
  { label: "Student", emoji: "🎓" },
  { label: "Teacher", emoji: "📚" },
  { label: "Administrator", emoji: "🛠️" },
];

export default function Role() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const buttonDivRef = useRef(null);

  useEffect(() => {
    if (
      showModal &&
      buttonDivRef.current &&
      window.google &&
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    ) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (response) => {
          console.log("Google credential", response);
          setShowModal(false);
        },
      });

      window.google.accounts.id.renderButton(buttonDivRef.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, [showModal]);

  const handleRoleClick = (role) => {
    if (role === "Administrator") {
      alert("Redirecting to admin login...");
    } else {
      setSelectedRole(role);
      setShowModal(true);
    }
  };

  return (
    <div className="role-container">
      <h2 className="role-title-large">You are a...</h2> {/* 👈 Bigger title */}
      <div className="card-wrapper">
        {roles.map((role) => (
          <div
            key={role.label}
            className="role-card"
            onClick={() => handleRoleClick(role.label)}
          >
            <div className="emoji">{role.emoji}</div>
            <div className="label-big">{role.label}</div> {/* 👈 Bigger role label */}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3 className="modal-text">Sign in as {selectedRole} with Google</h3>
            <div ref={buttonDivRef} id="buttonDiv" style={{ margin: "1rem 0" }} />
            <button onClick={() => setShowModal(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
