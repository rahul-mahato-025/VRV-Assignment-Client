import { Skeleton } from "../ui/skeleton";

const items = new Array(10).fill(0);

function DataTableSkeleton() {
  return (
    <div className="flex flex-col space-y-4 justify-center items-center w-[100%]">
      <div className="flex flex-row gap-2 justify-start">
        <Skeleton className="h-[5vh] w-[100px] rounded-xl" />
        <Skeleton className="h-[5vh] w-[200px] rounded-xl " />
      </div>
      <Skeleton className="h-[90vh] w-[90%] rounded-xl flex flex-col gap-5  px-4 py-4">
        <div className="space-y-6">
          {items.map((item, index) => {
            return <Skeleton key={index} className="h-8 w-[100%]" />;
          })}
        </div>
      </Skeleton>
    </div>
  );
}

export default DataTableSkeleton;
