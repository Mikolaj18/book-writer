import {Skeleton} from "@/components/ui/skeleton";

export function ChapterLoadingState() {
    return (
        <section className="w-full space-y-8 py-12">
            <div className="flex flex-col justify-center items-center space-y-8">
                <Skeleton data-testid="loading-item" className="w-[470px] h-[48px]"/>
                <Skeleton data-testid="loading-item" className="w-[250px] h-[32px]"/>
            </div>
            <div className="flex justify-between items-center">
                <Skeleton data-testid="loading-item" className="w-[130px] h-[40px]"/>
                <Skeleton data-testid="loading-item" className="w-[130px] h-[40px]"/>
            </div>
            <Skeleton className="w-full h-[400px]"/>
            <div className="flex justify-between items-center">
                <Skeleton data-testid="loading-item" className="w-[92px] h-[40px]"/>
                <Skeleton data-testid="loading-item" className="w-[92px] h-[40px]"/>
            </div>
        </section>
    );
}