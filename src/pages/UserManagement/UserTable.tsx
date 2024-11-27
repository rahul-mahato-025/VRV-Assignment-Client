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
import UserForm from "./UserForm";
import { createUser } from "@/services/userApi";
import { Modal } from "@/components/shared/Modal";
import { DataTable } from "@/components/shared/DataTable";
import { User } from "@/types/user";

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  users: User[];
}

export function UserTable<TData, TValue>({
  columns,
  users,
}: UserTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    data: users as TData[],
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

  const [addUserModal, setAddUserModal] = React.useState(false);

  return (
    <DataTable columns={columns} data={users as TData[]} table={table}>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter first names..."
          value={
            (table.getColumn("firstName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn("firstName")?.setFilterValue(event.target.value);
          }}
          className="max-w-xs border-slate-300 shadow-sm"
        />
        <div className="flex flex-row gap-2">
          {
            <Modal
              open={addUserModal}
              setOpen={setAddUserModal}
              title="Add User"
              actionText="Add user"
              asActionItem
              icon={<UserRoundPlus />}
              FormType={
                <UserForm onSubmit={createUser} setOpen={setAddUserModal} />
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
