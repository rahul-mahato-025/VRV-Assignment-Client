import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Role } from "@/types/role";
import UserDropdown from "./UserDropdown";

export type User = {
  _id: string;
  firstName: string;
  lastName: string | null;
  status: "active" | "inactive";
  isAdmin: boolean;
  roles: Role[];
  email: string;
  createdAt: Date;
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => {
      return <p>{row.original.lastName}</p>;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => {
      return (
        <DropdownMenu key={row.original._id}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">View Roles</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Assigned Roles</DropdownMenuLabel>

            {!row.original.roles.length ? (
              <DropdownMenuItem>No Roles Assigned</DropdownMenuItem>
            ) : (
              row.original.roles.map((role: Role) => (
                <DropdownMenuItem>{role.roleName}</DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Added
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <UserDropdown key={user._id} user={user} />;
    },
  },
];
