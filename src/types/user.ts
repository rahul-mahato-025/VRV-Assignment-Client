import { Role } from "./role";

export type User = {
  _id: string;
  firstName: string;
  lastName: string | null;
  status: "active" | "inactive";
  isAdmin: boolean;
  roles: Role[];
  email: string;
};

export interface updateUserTypes {
  userId: string;
  userData: User;
}
