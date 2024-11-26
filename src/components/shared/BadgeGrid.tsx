import { CircleX, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { useToast } from "@/hooks/use-toast";

interface BadgeGridProps {
  itemsList: string[];
  onChange: (items: string[]) => void;
}

function BadgeGrid({ itemsList, onChange }: BadgeGridProps) {
  const [list, setList] = useState<string[]>(itemsList);
  const [newItem, setNewItem] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    onChange(list);
  }, [list]);

  function hasItem(item: string) {
    return list.find((i) => i === item);
  }

  function removeItem(item: string) {
    setList(list.filter((i) => i !== item));
  }

  function addItem(item: string) {
    if (item.trim() === "") return;

    if (hasItem(item.toLowerCase())) {
      toast({
        title: "Permission already added.",
      });
      return;
    }

    setList([...list, item.toLowerCase()]);
  }

  function handleChange(type: string, item: string) {
    if (type === "add") {
      addItem(item);
    } else removeItem(item);
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {list.map((item, index) => (
        <Badge
          key={`${item}-${index}`}
          variant="outline"
          className="flex flex-row gap-2"
        >
          <span className="text-md">{item}</span>
          <CircleX
            size={16}
            color="#f45c5c"
            onClick={() => handleChange("remove", item)}
            className="hover:cursor-pointer"
          />
        </Badge>
      ))}
      <Popover modal={true}>
        <PopoverTrigger className="flex flex-row gap-2 items-center9">
          <Button type="button">
            <PlusCircle size={20} />
            Add
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-row gap-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Permission Name"
          />
          <Button type="button" onClick={() => handleChange("add", newItem)}>
            Add
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default BadgeGrid;
