import {Skeleton} from "@/components/ui/skeleton";

export function BookLoadingState() {
    return (
        <section className="w-full space-y-8 py-12">
            <div className="flex justify-between items-center">
                <Skeleton data-testid="loading-item" className="w-[130px] h-[40px]"/>
                <Skeleton data-testid="loading-item" className="w-[130px] h-[40px]"/>
            </div>
            <div className="flex justify-center">
                <Skeleton data-testid="loading-item" className="text-center w-[300px] h-[40px]"/>
            </div>
            <div className="flex flex-col">
                <ul className="flex flex-col">
                    {new Array(3).fill('').map((_, i) => (
                        <Skeleton data-testid="loading-item" key={i} className="w-full h-[90px] dark:border-white/10 border-2 border-b-0 last:border-b-2"/>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between items-center">
                <Skeleton data-testid="loading-item" className="w-[92px] h-[40px]"/>
                <Skeleton data-testid="loading-item" className="w-[192px] h-[40px]"/>
            </div>
        </section>
    );
}