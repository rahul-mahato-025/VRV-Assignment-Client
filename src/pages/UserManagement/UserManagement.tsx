import { userColumns } from "./UserColumns";
import { getAllUsers } from "@/services/userApi";
import { useQuery } from "react-query";
import { UserTable } from "./UserTable";
import DataTableSkeleton from "@/components/shared/DataTableSkeleton";
import Header from "@/components/shared/Header";
import { useUsers } from "@/hooks/use-users";

export function UserManagement() {
  const { users, updateUsers } = useUsers();
  const { isLoading, data } = useQuery("usersList", getAllUsers, {
    onSuccess: () => updateUsers(data.data),
  });

  if (isLoading) return <DataTableSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <Header heading="All Users" />
      <div className="container mx-auto w-[100%]">
        <UserTable columns={userColumns} users={users} />
      </div>
    </div>
  );
}
