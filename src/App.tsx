import { Route, Routes } from "react-router-dom";
import { UserManagement } from "./pages/UserManagement/UserManagement";
import { SideBar } from "./components/shared/SideBar";
import RoleManagement from "./pages/RoleManagement/RoleManagement";
import { Toaster } from "./components/ui/toaster";
import { SidebarTrigger } from "./components/ui/sidebar";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <SideBar />
      <main className="w-full p-4 bg-background text-foreground">
        <SidebarTrigger />
        <Routes>
          <Route path="/" element={<UserManagement />} />
          <Route path="/role-management" element={<RoleManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </main>
    </>
  );
}

export default App;
