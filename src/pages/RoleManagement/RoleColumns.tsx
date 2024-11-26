import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Role } from "@/types/role";
import RoleDropdown from "./RoleDropdown";
import { ArrowUpDown } from "lucide-react";

export const roleColumns: ColumnDef<Role>[] = [
  {
    accessorKey: "roleName",
    header: "Role Name",
  },

  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">View Permissions</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Assigned Permissions</DropdownMenuLabel>

            {!row.original.permissions.length ? (
              <DropdownMenuItem>No Permissions Assigned</DropdownMenuItem>
            ) : (
              row.original.permissions.map((permission: string) => (
                <DropdownMenuItem>{permission}</DropdownMenuItem>
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
      const role = row.original;

      return <RoleDropdown role={role} />;
    },
  },
];
