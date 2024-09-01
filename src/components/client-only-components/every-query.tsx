"use client";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getEveryQuery } from "@/app/apiCalls/callEveryQuery";
import { SkeletonQuery } from "../skeleton-components/skeleton-queries";

export function EveryQueryPage() {
    const { userPresent, user } = useAppSelector((state) => state.auth);
    const [queries, setQueries] = useState([]);
    const [queryConfig, setQueryConfig] = useState(false);
    useEffect(() => {
        const getAllQuery = async () => {
            const allQueries = await getEveryQuery();
            setQueries(allQueries);
            setQueryConfig(true);
        }
        
        if(userPresent) getAllQuery();
    }, []);

    return <>
        {(queryConfig) ? (userPresent && user && queries.length > 0) ? <section className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="container px-4 md:px-6 gap-8 pb-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">All Queries</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                See all your queries that might improve our website
                </p>
            </div>
            <div className="container px-4 md:px-6 pt-6">
            <Table>
                <TableCaption>A list of all recent queries</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Query ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-right">Message</TableHead>
                    </TableRow>
                </TableHeader>
                {
                    queries.map((query: { createdAt: string, _id: string, name: string, email: string, subject: string, message: string }, index: number) => {
                        return <TableBody key={`every_query_${index}`}>
                            <TableRow>
                                <TableCell className="font-medium w-[100px]">{query._id}</TableCell>
                                <TableCell>{query.createdAt.slice(0, 10)}</TableCell>
                                <TableCell>{query.name}</TableCell>
                                <TableCell>{query.email}</TableCell>
                                <TableCell>{query.subject || "-"}</TableCell>
                                <TableCell className="text-right">{query.message}</TableCell>
                            </TableRow>
                        </TableBody>
                    })
                }
            </Table>

            </div>
        </section> : <div className="h-full w-full flex justify-center items-center min-h-screen ">
                    No one has submitted any queries yet!
        </div> : <SkeletonQuery />}
    </>
}