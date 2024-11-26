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

export interface RoleFormProps<T> {
  className?: string;
  role?: Role;
  btnText: string;
  onSubmit: (data: T) => Promise<any>;
  setOpen: (val: boolean) => void;
}

const roleSchema = z.object({
  roleName: z.string().min(1, {
    message: "Role Name is required.",
  }),
  permissions: z.array(z.string()).default([]),
});

function RoleForm<T>({
  className,
  role,
  btnText,
  onSubmit,
  setOpen,
}: RoleFormProps<T>) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      roleName: role?.roleName || "",
      permissions: role?.permissions || [],
    },
  });

  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      setOpen(false);
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
      console.log(values);
      mutation.mutate({ data: values } as T);
    }
  }

  return (
    <Form {...form}>
      <FormComponent
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className={className}
        btnText={btnText}
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
              <FormItem className="self-end">
                <FormLabel className="text-foreground">
                  Add Permissions
                </FormLabel>
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
      </FormComponent>
    </Form>
  );
}

export default RoleForm;
