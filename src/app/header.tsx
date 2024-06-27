"use client";

import Link from "next/link";
import {ModeToggle} from "@/components/ui/mode-toggle";
import {HeaderActions} from "@/app/header-actions";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

export function Header() {
    const pathname = usePathname();
    return (
        <header className="py-6">
            <div className="flex justify-between items-center gap-2">
                <Link href="/">
                    <div className="hidden text-md mobi-lg:block">
                        Book Writer
                    </div>
                </Link>
                <nav
                    className="flex gap-8 items-center rounded-full bg-white/90 px-3 text-sm sm:text-base font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 p-2">
                    <Link className={cn("hover:text-teal-400 transition", {
                        "text-teal-400": pathname.endsWith("/")
                    })}
                          href="/">Homepage</Link>
                    <Link className={cn("hover:text-teal-400 transition", {
                        "text-teal-400": pathname.endsWith("/books")
                    })}
                          href="/books">Books</Link>
                </nav>
                <div className="flex gap-4 items-center">
                    <ModeToggle/>
                    <HeaderActions/>
                </div>
            </div>
        </header>
    );
}