/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

interface confirmAction<T> {
  id: string;
  btnText: string;
  onSubmit: (data: T) => Promise<any>;
  setOpen: (val: boolean) => void;
}

function ConfirmAction<T>({
  id,
  btnText,
  onSubmit,
  setOpen,
}: confirmAction<T>) {
  const { toast } = useToast();
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

  function handleFormSubmit() {
    mutation.mutate({ id } as T);
  }

  return (
    <Button variant="destructive" onClick={handleFormSubmit}>
      {btnText}
    </Button>
  );
}

export default ConfirmAction;
