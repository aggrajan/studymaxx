import { Skeleton } from "../ui/skeleton";

export function SkeletonReviews() {
    return (
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6 pt-8 mb-24">
            <div className="grid gap-8 w-full">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
                    <Skeleton className="w-full h-40" />
                </div>
                <div className="w-full">
                    <h2 className="mb-4 w-full">Customer Reviews</h2>
                    <div className="grid gap-6 w-full">
                        <div key={`my_review`} className="w-full">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-40 h-8" />
                                    <Skeleton className="w-16 h-5" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-0.5">
                                        <Skeleton className="w-20 h-5" />
                                    </div>
                                    <Skeleton className="w-10 h-5" />
                                </div>
                                <Skeleton className="w-full h-32" />
                            </div>
                        </div>

                        <div key={`other_review`} className="w-full">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-40 h-8" />
                                    <Skeleton className="w-16 h-5" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-0.5">
                                        <Skeleton className="w-20 h-5" />
                                    </div>
                                    <Skeleton className="w-10 h-5" />
                                </div>
                                <Skeleton className="w-full h-32" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}