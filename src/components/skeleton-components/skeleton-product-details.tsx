import { Skeleton } from "../ui/skeleton";
export function SkeletonProductDetails(props : any) {
    const { isModal } = props;
    return (
        <div className={`${isModal ? "flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 mx-auto py-6" : "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 mx-auto py-6"}`}>
            <div className="grid gap-4">
                <Skeleton className="w-[450px] h-[600px] md:ml-auto mx-auto" />
            </div>
            <div className="grid gap-4 md:gap-8">
                <div className="grid gap-2">
                    <Skeleton className="w-full h-20 md:w-[30rem]" />
                    <div className="flex flex-row justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span>by</span>
                            <Skeleton className="w-28 h-5" />
                            <Skeleton className="w-20 h-8" />
                        </div>
                    </div>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center justify-start gap-4">
                        <Skeleton className="w-20 h-8" />
                        <Skeleton className="w-16 h-8" />
                        <Skeleton className="w-16 h-5" />
                    </div>
                    <Skeleton className="w-36 h-10" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-1">
                        <div className="flex justify-start items-center gap-1">
                        <img src="/language.svg" width={22} />
                        <div className="text-sm font-semibold">Language</div>
                        </div>
                        <Skeleton className="w-10 h-5 ml-[25px]" />
                    </div>
                    <div className="grid gap-1">
                        <div className="flex justify-start items-center gap-1">
                        <img src="/isbn.svg" width={22} />
                        <div className="text-sm font-semibold">ISBN</div>
                        </div>
                        <Skeleton className="w-10 h-5 ml-[25px]" />
                    </div>
                    <div className="grid gap-1">
                        <div className="flex justify-start items-center gap-1">
                        <img src="/pages.svg" width={22} />
                        <div className="text-sm font-semibold">Pages</div>
                        </div>
                        <Skeleton className="w-10 h-5 ml-[25px]" />
                    </div>
                    <div className="grid gap-1">
                        <div className="flex justify-start items-center gap-1">
                        <img src="/year.svg" width={22} />
                        <div className="text-sm font-semibold">Year</div>
                        </div>
                        <Skeleton className="w-10 h-5 ml-[25px]" />
                    </div>
                    <div className="grid gap-1">
                        <div className="flex justify-start items-center gap-1">
                        <img src="/size.svg" width={22} />
                        <div className="text-sm font-semibold">Size</div>
                        </div>
                        <Skeleton className="w-10 h-5 ml-[25px]" />
                    </div>
                    <div className="grid gap-1">
                        <div className="flex justify-start items-center gap-1">
                        <img src="/paperback.svg" width={22} />
                        <div className="text-sm font-semibold">Binding</div>
                        </div>
                        <Skeleton className="w-10 h-5 ml-[25px]" />
                    </div>
                    <div className="grid gap-1">
                        <div className="flex justify-start items-center gap-1">
                        <img src="/category.svg" width={22} /> 
                        <div className="text-sm font-semibold">Category</div>
                        </div>
                        <Skeleton className="w-10 h-5 ml-[25px]" />
                    </div>
                </div>

                <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-x-3 gap-y-3 ${isModal ? "w-full" : "w-full lg:w-5/6"}`}>
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
            </div>
        </div>
    );
}