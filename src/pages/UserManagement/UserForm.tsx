/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/hooks/use-toast";
import FormComponent from "@/components/shared/Form";
import { Input } from "@/components/ui/input";
import Roles from "@/pages/UserManagement/ManageRolesDropdown";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { User } from "./UserColumns";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import { useUsers } from "@/hooks/use-users";

export interface UserFormProps<T> {
  className?: string;
  user?: User;
  onSubmit: (data: T) => Promise<any>;
  setOpen: (val: boolean) => void;
}

const userSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().max(20, {
    message: "Last name cannot be more than 20 characters.",
  }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("This is not a valid email."),

  status: z.string({
    required_error: "Please select a status.",
  }),

  roles: z.array(z.string()).default([]),
});

function UserForm<T>({ className, user, onSubmit, setOpen }: UserFormProps<T>) {
  const { toast } = useToast();
  const { users, updateUsers } = useUsers();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      status: user?.status || "active",
      roles: user?.roles.map((role) => role._id) || [],
    },
  });

  function hasUser(updatedUser: User) {
    return users.find((user) => user._id === updatedUser._id);
  }

  function handleUpdate(updatedUser: User) {
    if (!hasUser(updatedUser)) {
      updateUsers([...users, updatedUser]);
      return;
    }
    const newUsers = users.map((user) => {
      if (user._id === updatedUser._id) return updatedUser;
      return user;
    });
    updateUsers(newUsers);
  }

  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      handleUpdate(data.data);
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

  function handleFormSubmit(values: z.infer<typeof userSchema>) {
    if (user) {
      mutation.mutate({ userId: user._id, userData: values } as T);
    } else {
      mutation.mutate(values as T);
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  className="text-muted-foreground"
                  placeholder={user?.firstName || ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Lastname */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  className="text-muted-foreground"
                  placeholder={user?.lastName || ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="text-muted-foreground"
                  placeholder={user?.email || ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px] text-muted-foreground">
                      <SelectValue placeholder={user?.status} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">active</SelectItem>
                    <SelectItem value="inactive">inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Roles */}
          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => (
              <FormItem className="self-end">
                <FormControl>
                  <Roles
                    userRoles={field.value}
                    onChange={(roles: string[]) => field.onChange(roles)}
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

export default UserForm;
