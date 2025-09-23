import React from "react";


export default function Header({ user, logout }) {
return (
<header className="flex items-center justify-between mb-6">
<div>
<h1
className="text-3xl font-extrabold"
style={{
background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
WebkitBackgroundClip: "text",
color: "transparent",
}}
>
Notes — Multi-Tenant SaaS
</h1>
{user && (
<div className="text-sm text-gray-600">
{user.email} • {user.role} @ <span className="font-medium">{user.tenantSlug}</span> • Plan:
<span className="font-semibold"> {user.tenantPlan}</span>
</div>
)}
</div>
<div>
{user ? (
<button
onClick={logout}
className="px-4 py-2 rounded-lg bg-red-500 text-white hover:opacity-90"
>
Logout
</button>
) : null}
</div>
</header>
);
}