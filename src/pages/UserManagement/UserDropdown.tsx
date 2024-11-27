import { DropdownMenuComponent } from "@/components/shared/DropdownMenuComponent";
import { Modal } from "@/components/shared/Modal";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Copy, Pencil, Trash2 } from "lucide-react";
import React from "react";
import UserForm from "./UserForm";
import { deleteUser, updateUser } from "@/services/userApi";
import { User } from "./UserColumns";
import ConfirmAction from "@/components/shared/ConfirmAction";

interface RoleDropdownProps {
  user: User;
}

function UserDropdown({ user }: RoleDropdownProps) {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  return (
    <DropdownMenuComponent>
      <DropdownMenuItem
        onClick={() => navigator.clipboard.writeText(user.email)}
      >
        <Copy />
        Copy User Email
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Modal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          title="Edit User"
          description="Modify user details here"
          icon={<Pencil size={16} />}
          asActionItem={false}
          FormType={
            <UserForm
              user={user}
              onSubmit={updateUser}
              setOpen={setEditModalOpen}
            />
          }
          actionText="Edit User"
        />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Modal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          title="Confirm Action?"
          description="This action cannot be undone"
          actionText="Delete User"
          icon={<Trash2 color="#ff2e2e" size={16} />}
          asActionItem={false}
          FormType={
            <ConfirmAction
              updateEntity="user"
              setOpen={setDeleteModalOpen}
              id={user._id}
              onSubmit={deleteUser}
            />
          }
        />
      </DropdownMenuItem>
    </DropdownMenuComponent>
  );
}

export default UserDropdown;
