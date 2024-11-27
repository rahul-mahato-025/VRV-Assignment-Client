import { Role } from "@/types/role";
import { instance } from "./axios";

export async function createRole({ data }: { data: Role }) {
  const response = await instance.post(`/roles`, data);
  if (response.data.success === false) throw new Error(response.data.message);
  return response.data;
}

export async function getAllRoles() {
  const response = await instance.get("/roles");
  if (response.data.success === false) throw new Error(response.data.message);
  return response.data;
}

export async function updateRole({ id, data }: { id: string; data: Role }) {
  const response = await instance.patch(`/roles/${id}`, data);
  if (response.data.success === false) throw new Error(response.data.message);
  return response.data;
}

export async function deleteRole({ id }: { id: string }) {
  const response = await instance.delete(`/roles/${id}`);
  if (response.data.success === false) throw new Error(response.data.message);
  return response.data;
}
