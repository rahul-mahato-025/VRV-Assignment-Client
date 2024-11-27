import { Role } from "@/types/role";
import { createContext, useState, ReactNode } from "react";

interface RoleContextTypes {
  roles: Role[];
  updateRoles: (newUsers: Role[]) => void;
}

export const RoleContext = createContext<RoleContextTypes | undefined>(
  undefined
);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [roles, setRoles] = useState<Role[]>([]);

  const updateRoles = (newUsers: Role[]) => {
    setRoles(newUsers);
  };

  return (
    <RoleContext.Provider value={{ roles, updateRoles }}>
      {children}
    </RoleContext.Provider>
  );
};
