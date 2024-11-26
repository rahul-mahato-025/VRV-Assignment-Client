import { DropdownMenuComponent } from "@/components/shared/DropdownMenuComponent";
import { Modal } from "@/components/shared/Modal";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import RoleForm from "./RoleForm";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmAction from "@/components/shared/ConfirmAction";
import { deleteRole, updateRole } from "@/services/roleApi";
import { Role } from "@/types/role";
import React from "react";

interface RoleDropdownProps {
  role: Role;
}

function RoleDropdown({ role }: RoleDropdownProps) {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  return (
    <DropdownMenuComponent>
      <DropdownMenuItem asChild>
        <Modal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          title="Edit Role"
          icon={<Pencil size={16} />}
          asActionItem={false}
          FormType={
            <RoleForm
              btnText="Submit"
              role={role}
              onSubmit={updateRole}
              setOpen={setEditModalOpen}
            />
          }
          actionText="Edit Role"
        />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Modal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          title="Confirm Action?"
          description="This action cannot be undone"
          actionText="Delete Role"
          icon={<Trash2 color="#ff2e2e" size={16} />}
          asActionItem={false}
          FormType={
            <ConfirmAction
              setOpen={setDeleteModalOpen}
              id={role._id}
              btnText="Delete"
              onSubmit={deleteRole}
            />
          }
        />
      </DropdownMenuItem>
    </DropdownMenuComponent>
  );
}

export default RoleDropdown;
