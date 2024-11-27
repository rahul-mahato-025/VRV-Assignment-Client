import { RoleContext } from "@/context/roleContext";
import { useContext } from "react";

export const useRoles = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoles must be used within a RoleProvider");
  }
  return context;
};
