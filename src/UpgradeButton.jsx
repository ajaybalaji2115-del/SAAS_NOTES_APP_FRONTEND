import React from "react";

export default function UpgradeButton({ token }) {
  async function upgrade() {
    try {
      const tenantSlug = prompt("Enter tenant slug (acme or globex):");
      const res = await fetch(
        `http://localhost:8080/tenants/${tenantSlug}/upgrade`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Upgrade failed");
      alert("Upgrade successful!");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      onClick={upgrade}
      style={{
        marginTop: "20px",
        width: "100%",
        padding: "10px",
        background: "#FF9800",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Upgrade to Pro
    </button>
  );
}
