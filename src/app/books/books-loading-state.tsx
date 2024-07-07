import {Skeleton} from "@/components/ui/skeleton";
import {Card} from "@/components/ui/card";

export function BooksLoadingState() {
    return (
        <>
            <div className="flex justify-between items-center">
                <Skeleton className="w-[171px] h-[40px]"/>
                <Skeleton className="w-[173px] h-[40px]"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 py-4">
                {new Array(6).fill('').map((_, i) => (
                    <Card key={i} className="p-6 flex flex-col">
                        <div className="flex justify-between items-center">
                            <Skeleton className="w-[250px] h-[28px]"/>
                            <Skeleton className="w-[24px] h-[24px]"/>
                        </div>
                        <div className="mt-2">
                            <Skeleton className="w-[130px] h-[20px]"/>
                        </div>
                        <div className="mt-4">
                            <Skeleton className="w-full h-[300px]"/>
                        </div>
                        <div className="mt-3">
                            <Skeleton className="w-[144px] h-[40px]"/>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
}