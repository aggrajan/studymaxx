"use client";
import { getFeedbacks } from "@/app/apiCalls/callFeedbacks";
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

export function FeedbackPage() {
    const { userPresent, user } = useAppSelector((state) => state.auth);
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        const getAllFeedbacks = async () => {
            const allFeedbacks = await getFeedbacks();
            setFeedbacks(allFeedbacks);
        }
        
        if(userPresent) getAllFeedbacks();
    }, []);

    return <>
        {(userPresent && user && feedbacks.length > 0) ? <section className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="container px-4 md:px-6 gap-8 pb-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Feedbacks</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                See all your feedbacks that might improve our website
                </p>
            </div>
            <div className="container md:px-6 pt-6">
            <Table>
                <TableCaption>A list of your recent feedbacks</TableCaption>
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
                {
                    feedbacks.map((feedback: { createdAt: string, _id: string, name: string, email: string, book?: string, feedback: string }, index: number) => {
                        return <TableBody key={`feedback_${index}`}>
                            <TableRow>
                                <TableCell className="font-medium w-[100px]">{feedback._id}</TableCell>
                                <TableCell>{feedback.createdAt.slice(0, 10)}</TableCell>
                                <TableCell>{feedback.name}</TableCell>
                                <TableCell>{feedback.email}</TableCell>
                                <TableCell>{feedback.book || "-"}</TableCell>
                                <TableCell className="text-right">{feedback.feedback}</TableCell>
                            </TableRow>
                        </TableBody>
                    })
                }
            </Table>

            </div>
        </section> : <div className="h-full w-full flex justify-center items-center min-h-screen ">
                    You haven&apos;t submitted any feedbacks yet!
        </div>}
    </>
}