import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

export function SkeletonProductsPage() {
    const itemCartCss = "w-full aspect-[3/4]";
    return (
        <section className="max-w-[100rem] mx-auto px-4 md:px-6 mb-24">
            <div className="space-y-2 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-5">Welcome to StudyMaxx</h2>
                <div className="fflex flex-col w-full max-w-sm items-start mx-auto">
                    <Skeleton className="w-96 h-9" />
                    <div className="w-full">
                        <Button className="mt-3 mr-2">Search</Button>
                        <Button className="mt-3">Clear All Filters</Button>
                    </div>
                </div>
            </div>
            <div id="products_content" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6 mx-8 sm:mx-8 md:mx-6">
                <Skeleton className="w-80 sm:w-96 h-16" />
            </div>
            <div className="md:px-6 pt-6">
                <div className="flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        <Skeleton className={itemCartCss} />
                        <Skeleton className={itemCartCss} />
                        <Skeleton className={itemCartCss} />
                        <Skeleton className={itemCartCss} />
                        <Skeleton className={itemCartCss} />
                        <Skeleton className={itemCartCss} />
                        <Skeleton className={itemCartCss} />
                        <Skeleton className={itemCartCss} />
                    </div>
                </div>
            </div>
        </section>
    );
}