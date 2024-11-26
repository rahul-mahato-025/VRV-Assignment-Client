import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ListFilter } from "lucide-react";
import { Button } from "../../components/ui/button";
import { getAllRoles } from "@/services/roleApi";
import { Role } from "@/types/role";

interface ManageRolesDropdownProps {
  userRoles?: string[];
  onChange?: (roles: string[]) => void;
}

function ManageRolesDropdown({
  userRoles,
  onChange,
}: ManageRolesDropdownProps) {
  const { isLoading, data } = useQuery("rolesList", getAllRoles);
  const [userRolesState, setUserRolesState] = useState<string[]>([]);

  useEffect(() => {
    setUserRolesState(userRoles || []);
  }, [userRoles]);

  function hasRole(role: Role) {
    if (
      userRolesState?.find((roleId) => {
        return roleId === role._id;
      })
    )
      return true;
    return false;
  }

  function toggleRole(role: Role) {
    let newRoles = [];
    if (hasRole(role)) {
      newRoles = userRolesState?.filter((roleId) => roleId !== role._id);
    } else {
      newRoles = [...userRolesState, role._id];
    }
    setUserRolesState(newRoles);
    onChange?.(newRoles);
  }

  if (isLoading) return <h1>Loading..</h1>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-48 text-foreground" variant="outline">
          <ListFilter />
          Manage Roles
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Roles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data.data.map((role: Role) => {
          return (
            <DropdownMenuCheckboxItem
              className="hover:cursor-pointer"
              onSelect={(e) => e.preventDefault()}
              key={role._id}
              checked={hasRole(role)}
              onCheckedChange={() => toggleRole(role)}
            >
              {role.roleName}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ManageRolesDropdown;
