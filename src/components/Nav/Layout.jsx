import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
