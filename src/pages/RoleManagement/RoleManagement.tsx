import { getAllRoles } from "@/services/roleApi";

import { RoleTable } from "./RoleTable";
import { roleColumns } from "./RoleColumns";
import { useQuery } from "react-query";
import DataTableSkeleton from "@/components/shared/DataTableSkeleton";
import Header from "@/components/shared/Header";
import { useRoles } from "@/hooks/use-role";

function RoleManagement() {
  const { roles, updateRoles } = useRoles();
  const { isLoading } = useQuery("rolesList", getAllRoles, {
    onSuccess: (data) => updateRoles(data.data),
  });

  if (isLoading) return <DataTableSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <Header heading="All Roles" />
      <div className="container mx-auto w-[100%]">
        <RoleTable columns={roleColumns} roles={roles} />
      </div>
    </div>
  );
}

export default RoleManagement;
