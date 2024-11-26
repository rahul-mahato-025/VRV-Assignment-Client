import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserManagement } from "./pages/UserManagement/UserManagement";
import { SideBar } from "./components/shared/SideBar";
import RoleManagement from "./pages/RoleManagement/RoleManagement";
import { Toaster } from "./components/ui/toaster";
import { SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
    <>
      <SideBar />
      <main className="w-full p-4 bg-background text-foreground">
        <SidebarTrigger />
        <Routes>
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/role-management" element={<RoleManagement />} />
        </Routes>
        <Toaster />
      </main>
    </>
  );
}

export default App;
