import { getAllRoles } from "@/services/roleApi";

import { RoleTable } from "./RoleTable";
import { roleColumns } from "./RoleColumns";
import { useQuery } from "react-query";
import DataTableSkeleton from "@/components/shared/DataTableSkeleton";
import Header from "@/components/shared/Header";

function RoleManagement() {
  const { isLoading, data } = useQuery("rolesList", getAllRoles);

  if (isLoading) return <DataTableSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <Header heading="All Roles" />
      <div className="container mx-auto w-[100%]">
        <RoleTable columns={roleColumns} data={data.data} />
      </div>
    </div>
  );
}

export default RoleManagement;
