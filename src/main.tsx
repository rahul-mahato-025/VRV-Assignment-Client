import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./components/Theme/ThemeProvider";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { SidebarProvider } from "./components/ui/sidebar";
import { UserProvider } from "./context/userContext";
import { RoleProvider } from "./context/roleContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <UserProvider>
            <RoleProvider>
              <SidebarProvider>
                <App />
              </SidebarProvider>
            </RoleProvider>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
