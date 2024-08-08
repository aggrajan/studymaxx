import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function SkeleltonExploreBooks() {
    const itemCartCss = "w-full aspect-[3/4]"
    return (
        <section id="content" className="pt-12 md:pt-24 lg:pt-16 bg-background">
            <div className="container px-4 md:px-6 gap-8 pb-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Explore Our Products</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover our top-selling and most popular books across various genres.
                </p>
            </div>
            <div className="container px-4 md:px-6 grid md:grid-cols-[280px_1fr] gap-8">
                <div className="flex flex-col gap-4">
                    <Card className="rounded-md">
                        <CardHeader>
                        <CardTitle>Search for books by title.</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <Skeleton className="w-full h-9" />
                        <div className="flex flex-row gap-2">
                            <Skeleton className="mt-2 w-24 h-9" />
                            <Skeleton className="mt-2 w-32 h-9" />
                        </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-md">
                        <CardHeader>
                        <CardTitle>Filter books by Type of Book.</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <div className="flex flex-col my-2">
                            <Skeleton className="my-1 w-36 h-4" />
                            <Skeleton className="my-1 w-36 h-4" />
                            <Skeleton className="my-1 w-36 h-4" />
                            <Skeleton className="my-1 w-36 h-4" />
                            <Skeleton className="my-1 w-36 h-4" />
                        </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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