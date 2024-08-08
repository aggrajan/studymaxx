"use client";

import { BookIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export function SkeletonNavBar() {
    return <div className="fixed top-0 w-full px-4 lg:px-6 h-14 flex items-center bg-white z-50 border shadow">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <BookIcon className="h-6 w-6" />
          <span className="sr-only">StudyMaxx</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <Skeleton className="hidden md:inline w-20 h-5" />
            <Skeleton className="hidden md:inline w-20 h-5" />
            <Skeleton className="hidden md:inline w-20 h-5" />
            <Skeleton className="hidden md:inline w-20 h-5" />
            <Skeleton className="hidden md:inline w-20 h-5" />
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-12 h-8 rounded-full" />
            <Skeleton className="md:hidden w-12 h-8 rounded-full" />
        </nav>
    </div>
}