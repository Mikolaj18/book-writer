import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Doc} from "../../convex/_generated/dataModel";

export function ObjectNavigation({previousItem, nextItem, previousText, nextText, url}: {previousItem: Doc<"books" | "chapters">, nextItem: Doc<"books" | "chapters">, previousText: string, nextText: string, url: string}) {
    return (
        <div className="flex flex-col gap-y-4 mobi-lg:flex-row justify-between items-center">
            <Button className="w-full mobi-lg:w-[130px] disabled:bg-black/70 dark:disabled:bg-white/70" asChild={!!previousItem} disabled={!previousItem}>
                {previousItem ? (
                    <Link href={`/${url}/${previousItem._id}`}>
                        {previousText}
                    </Link>
                ) : (
                    <span>{previousText}</span>
                )}
            </Button>

            <Button className="w-full mobi-lg:w-[130px] disabled:bg-black/70 dark:disabled:bg-white/70" asChild={!!nextItem} disabled={!nextItem}>
                {nextItem ? (
                    <Link href={`/${url}/${nextItem._id}`}>
                        {nextText}
                    </Link>
                ) : (
                    <span>{nextText}</span>
                )}
            </Button>
        </div>
    );
}