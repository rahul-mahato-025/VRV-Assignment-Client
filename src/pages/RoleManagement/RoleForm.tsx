/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/hooks/use-toast";
import FormComponent from "@/components/shared/Form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "react-query";
import { Role } from "@/types/role";
import BadgeGrid from "@/components/shared/BadgeGrid";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { useRoles } from "@/hooks/use-role";

export interface RoleFormProps<T> {
  className?: string;
  role?: Role;
  onSubmit: (data: T) => Promise<any>;
  setOpen: (val: boolean) => void;
}

const roleSchema = z.object({
  roleName: z.string().min(1, {
    message: "Role Name is required.",
  }),
  permissions: z.array(z.string()).default([]),
});

function RoleForm<T>({ className, role, onSubmit, setOpen }: RoleFormProps<T>) {
  const { toast } = useToast();
  const { roles, updateRoles } = useRoles();
  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      roleName: role?.roleName || "",
      permissions: role?.permissions || [],
    },
  });

  function hasRole(updatedRole: Role) {
    return roles.find((role) => role._id === updatedRole._id);
  }

  function handleUpdate(updatedRole: Role) {
    if (!hasRole(updatedRole)) {
      updateRoles([...roles, updatedRole]);
      return;
    }

    const newRoles = roles.map((role) => {
      if (role._id === updatedRole._id) return updatedRole;
      return role;
    });
    updateRoles(newRoles);
  }

  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      setOpen(false);
      handleUpdate(data.data);
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

  function handleFormSubmit(values: z.infer<typeof roleSchema>) {
    if (role) {
      mutation.mutate({
        id: role._id,
        data: {
          roleName: values.roleName,
          permissions: values.permissions,
        },
      } as T);
    } else {
      mutation.mutate({ data: values } as T);
    }
  }

  return (
    <Form {...form}>
      <FormComponent
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className={className}
      >
        <FormField
          control={form.control}
          name="roleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Role Name</FormLabel>
              <FormControl>
                <Input
                  className="text-muted-foreground"
                  placeholder={role?.roleName || ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-2">
          {/* Roles */}
          <FormField
            control={form.control}
            name="permissions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Permissions</FormLabel>
                <FormControl>
                  <BadgeGrid
                    itemsList={field.value}
                    onChange={(permissions: string[]) =>
                      field.onChange(permissions)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">
          {mutation.isLoading ? <Spinner /> : "Submit"}
        </Button>
      </FormComponent>
    </Form>
  );
}

export default RoleForm;
