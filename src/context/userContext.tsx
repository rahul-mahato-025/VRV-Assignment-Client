import { User } from "@/types/user";
import { createContext, useState, ReactNode } from "react";

interface UserContextType {
  users: User[];
  updateUsers: (newUsers: User[]) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const updateUsers = (newUsers: User[]) => {
    setUsers(newUsers);
  };

  return (
    <UserContext.Provider value={{ users, updateUsers }}>
      {children}
    </UserContext.Provider>
  );
};
