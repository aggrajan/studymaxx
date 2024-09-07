import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function SkeletonFeedbackPage() {
    return (
        <>
            <section className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="container px-4 md:px-6 gap-8 pb-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Feedbacks</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    See all the feedbacks that might improve our website
                    </p>
                </div>
                <div className="container md:px-6 pt-6">
                <Table>
                    <TableCaption>A list of all recent feedbacks</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Feedback ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Book</TableHead>
                        <TableHead className="text-right">Feedback</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        <TableRow>
                            <TableCell className="font-medium w-[100px]"><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="w-full h-8" /></TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody >
                        <TableRow>
                            <TableCell className="font-medium w-[100px]"><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="w-full h-8" /></TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody >
                        <TableRow>
                            <TableCell className="font-medium w-[100px]"><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="w-full h-8" /></TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody >
                        <TableRow>
                            <TableCell className="font-medium w-[100px]"><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell><Skeleton className="w-full h-8" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="w-full h-8" /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </div>
            </section>
        </>
    );
}