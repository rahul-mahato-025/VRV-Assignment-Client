import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useState } from "react";
import { ChartNoAxesColumn, UserRoundPlus } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import RoleForm from "./RoleForm";
import { DataTable } from "@/components/shared/DataTable";
import { createRole } from "@/services/roleApi";

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function RoleTable<TData, TValue>({
  columns,
  data,
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  const [addRoleModal, setAddRoleModal] = React.useState(false);

  return (
    <DataTable columns={columns} data={data} table={table}>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter roles..."
          value={
            (table.getColumn("roleName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn("roleName")?.setFilterValue(event.target.value);
          }}
          className="max-w-xs border-slate-300 shadow-sm"
        />
        <div className="flex flex-row gap-2">
          {
            <Modal
              open={addRoleModal}
              setOpen={setAddRoleModal}
              title="Add Role"
              actionText="Add Role"
              asActionItem
              icon={<UserRoundPlus />}
              FormType={
                <RoleForm
                  btnText="Submit"
                  onSubmit={createRole}
                  setOpen={setAddRoleModal}
                />
              }
            />
          }
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <ChartNoAxesColumn />
                Filter Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </DataTable>
  );
}
