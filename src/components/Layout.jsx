import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
