import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = ({ numberOfCards = 1 }: { numberOfCards?: number }) => {
  return (
    <>
      {Array.from({ length: numberOfCards }).map((_, index) => (
        <div key={index} className="space-y-3 common-card !py-6">
          <div className="flex items-center gap-x-2">
            <Skeleton className="w-6 h-6 rounded-full bg-neutral-300" />
            <Skeleton className="w-full flex-1 h-3 rounded-sm bg-neutral-300" />
          </div>
          <Skeleton className="w-1/4 h-4 rounded-md bg-neutral-300" />
        </div>
      ))}
    </>
  );
};

export default CardSkeleton;
