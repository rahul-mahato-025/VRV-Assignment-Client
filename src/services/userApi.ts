import { updateUserTypes, User } from "@/types/user";
import { instance } from "./axios";

interface responseType {
  data: User[];
  message: string;
  success: boolean;
  err: string;
}

export interface userFormTypes {
  className?: string;
  user?: User;
  btnText: string;
  onSubmit: () => Promise<responseType>;
}

export async function createUser(userData: User) {
  const { data } = await instance.post(`/users/`, userData);
  if (data.success === false) throw new Error(data.message);
  return data;
}

export async function getAllUsers() {
  try {
    const { data } = await instance.get("/users");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser({ userId, userData }: updateUserTypes) {
  const { data } = await instance.patch(`/users/${userId}`, userData, {});
  if (data.success === false) throw new Error(data.message);
  return data;
}

export async function deleteUser({ id }: { id: string }) {
  const response = await instance.delete(`/users/${id}`);
  if (response.data.success === false) throw new Error(response.data.message);
  return response.data;
}
