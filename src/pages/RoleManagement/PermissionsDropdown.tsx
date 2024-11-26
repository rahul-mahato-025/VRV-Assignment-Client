import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PermissionsDropdownProps {
  permissions?: string[];
  onChange?: (permissions: string[]) => void;
}

function PermissionsDropdown({
  permissions,
  onChange,
}: PermissionsDropdownProps) {
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);

  useEffect(() => {
    setRolePermissions(permissions || []);
  }, [permissions]);

  function hasPermission(permission: string) {
    if (
      rolePermissions?.find((p) => {
        return p === permission;
      })
    )
      return true;
    return false;
  }

  function togglePermission(permission: string) {
    let newPermissions = [];
    if (hasPermission(permission)) {
      console.log(permission);

      newPermissions = rolePermissions?.filter((p) => p !== permission);
    } else {
      newPermissions = [...rolePermissions, permission];
    }
    setRolePermissions(newPermissions);
    onChange?.(newPermissions);
  }
  console.log(permissions);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-48 text-foreground" variant="outline">
          <ListFilter />
          Manage Permissions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Permissions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {permissions &&
          permissions.map((permission: string, index: number) => {
            return (
              <DropdownMenuCheckboxItem
                onSelect={(e) => e.preventDefault()}
                key={`${permission}-${index}`}
                checked={hasPermission(permission)}
                onCheckedChange={() => togglePermission(permission)}
              >
                {permission}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PermissionsDropdown;
