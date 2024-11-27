/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import Spinner from "./Spinner";
import { useUsers } from "@/hooks/use-users";
import { useRoles } from "@/hooks/use-role";

interface confirmAction<T> {
  id: string;
  onSubmit: (data: T) => Promise<any>;
  setOpen: (val: boolean) => void;
  updateEntity: string;
}

function ConfirmAction<T>({
  id,
  onSubmit,
  setOpen,
  updateEntity,
}: confirmAction<T>) {
  const { toast } = useToast();
  const { users, updateUsers } = useUsers();
  const { roles, updateRoles } = useRoles();

  function handleStateUpdate(id: string) {
    if (updateEntity === "user") {
      updateUsers(users.filter((user) => user._id !== id));
    } else if (updateEntity === "role") {
      updateRoles(roles.filter((role) => role._id !== id));
    }
  }

  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      setOpen(false);
      handleStateUpdate(id);
      toast({
        variant: "success",
        title: data.message,
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.response?.data?.err || "An error occurred",
      });
    },
  });

  function handleFormSubmit() {
    mutation.mutate({ id } as T);
  }

  return (
    <Button variant="destructive" onClick={handleFormSubmit}>
      {mutation.isLoading ? <Spinner /> : "Proceed"}
    </Button>
  );
}

export default ConfirmAction;
