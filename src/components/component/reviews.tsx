"use client"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAppSelector } from "@/lib/hooks"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { reviewSchema } from "@/schemas/addReviewSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
import { useToast } from "../ui/use-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Loader2 } from "lucide-react"
import { formatDistanceToNow } from 'date-fns'

type Review = {
  _id: string;
  user: {
    _id: string;
    name?: string;
    username?: string;
    picture?: string;
  };
  review: string;
  rating: number;
  createdAt?: string;
};

export function Reviews({ bookId } : { bookId : string }) {
  const [otherReviews, setOtherReviews] = useState<Review[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [myReviewsPage, setMyReviewsPage] = useState(1);
  const [otherReviewsPage, setOtherReviewsPage] = useState(1);

  const isFirstCallForMyReviews = useRef(true);
  const isFirstCallForOtherReviews = useRef(true);
 
  const increment = 5;
  const [lastMyReviews, setLastMyReviews] = useState(increment);
  const [lastOtherReviews, setLastOtherReviews] = useState(increment);
  const userPresent = useAppSelector((state) => state.auth.userPresent);
  const user = useAppSelector((state) => state.auth.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if(isFirstCallForMyReviews.current) {
      isFirstCallForMyReviews.current = false;

      (
        async () => {
          try {
            const response = await axios.get(`/api/get-reviews/${bookId}?page=${myReviewsPage}&increment=${increment}&userId=${user?._id || ""}&notAllowedUserId=false`);
            if(response.status === 200) {
              const reviews = response.data.response;
              setMyReviews((prev) => [...prev, ...reviews]);
              setLastMyReviews(reviews.length);
            } else {
              console.log("Wrong input");
            }
          } catch (error: any) {
            console.log(error.message);
          }
        }
      )();
    }
  }, [bookId, myReviewsPage, user?._id]);

  useEffect(() => {
    if(isFirstCallForOtherReviews.current) {
      isFirstCallForOtherReviews.current = false;

      (
        async () => {
          try {
            const response = await axios.get(`/api/get-reviews/${bookId}?page=${otherReviewsPage}&increment=${increment}&userId=${user?._id || ""}&notAllowedUserId=true`);
            if(response.status === 200) {
              const reviews = response.data.response;
              setOtherReviews((prev) => [...prev, ...reviews]);
              setLastOtherReviews(reviews.length);
            } else {
              console.log("Wrong input");
            }
          } catch (error: any) {
            console.log(error.message);
          }
        }
      )();
    }
  }, [bookId, otherReviewsPage, user?._id]);

  function getFallBack(user: Review["user"]) {
      if(user?.name) {
          return user.name.split(" ").reduce((prev, curr) => prev + curr[0], "")
      } else if(user?.username) {
          return user?.username.toUpperCase()[0];
      } else {
          return "User"
      }
  }
  
  const form = useForm<z.infer<typeof reviewSchema>>({
      resolver: zodResolver(reviewSchema),
      defaultValues: {
          userId: user?._id || "",
          bookId: bookId,
          review: "",
          rating: 0
      }
  });

  const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
      setIsSubmitting(true);
      try{
          const response = await axios.post('/api/add-review', data);
          if(response.status === 201) {
              toast({
                  title: "Review Submitted",
                  description: "Review successfully submitted",
                  variant: "default"
              });

              router.push(`/products/${bookId}`);
              router.refresh();
          } else {
              toast({
                  title: "Error Occured",
                  description: "There might be some issue with the data provided",
                  variant: "destructive"
              });
              
              router.push('/');
          }
      } catch(error: any) {
          toast({
              title: "Error Occured",
              description: error.message,
              variant: "destructive"
          });
      } finally {
          setIsSubmitting(false);
      }
      
  }

  const onDelete = async (reviewId: string) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/delete-review', { userId: user?._id, bookId: bookId, reviewId: reviewId });
      if(response.status == 200) {
        toast({
            title: "Review Deleted",
            description: "Review successfully deleted",
            variant: "default"
        });
        
        router.push(`/products/${bookId}`);
        router.refresh();
      } else {
          toast({
              title: "Error Occured",
              description: "There might be some issue with the data provided",
              variant: "destructive"
          });
          
          router.push('/');
      }
    } catch (error: any) {
      toast({
          title: "Error Occured",
          description: error.message,
          variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-7xl w-full mx-auto px-4 md:px-6 pt-8">
      <div className="grid gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
          <Form {...form}>
            <form onSubmit={(e: any) => {
              e.preventDefault();
              if (!userPresent) {
                toast({
                  title: "Login Required",
                  description: "You must be logged in to submit a review",
                  variant: "destructive"
                });
                setIsSubmitting(false);
                return;
              }
              form.handleSubmit(onSubmit)();
            }} className="grid gap-4">
              <div className="grid gap-2">
                  <FormField 
                      name="review"
                      control={form.control}
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Review</FormLabel>
                              <FormControl>
                                  <Textarea placeholder="enter your review" {...field} onClick={() => {
                                    if (!userPresent) {
                                      toast({
                                        title: "Login Required",
                                        description: "You must be logged in to submit a review",
                                        variant: "destructive"
                                      });
                                    }
                                  }} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}      
                  />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <FormField 
                      name="rating"
                      control={form.control}
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Rating</FormLabel>
                                  <FormControl>
                                  <div className="flex items-center gap-2">
                                    {Array.from({ length: field.value }, (_, i) => i + 1).map((index) => (
                                      <StarIcon key={`star_icon_${index}`} className="w-5 h-5 fill-primary cursor-pointer" onClick={() => {
                                        if (!userPresent) {
                                          toast({
                                            title: "Login Required",
                                            description: "You must be logged in to submit a review",
                                            variant: "destructive"
                                          });
                                        } else {
                                          field.onChange(index);
                                        }
                                      }} />
                                    ))}
                                    {Array.from({ length: 5 - field.value }, (_, i) => field.value + i + 1).map((index) => (
                                      <StarIcon key={`star_icon_non_${index}`} className="w-5 h-5 fill-muted stroke-muted-foreground cursor-pointer" onClick={() => {
                                        if (!userPresent) {
                                          toast({
                                            title: "Login Required",
                                            description: "You must be logged in to submit a review",
                                            variant: "destructive"
                                          });
                                        } else {
                                          field.onChange(index);
                                        }
                                      }} />
                                    ))}
                                  </div>
                                </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}      
                    />
                  
                </div>
              </div>
              <Button type="submit" className={`justify-self-end cursor-pointer bg-blue-700 hover:bg-blue-800`} disabled={isSubmitting}>
                {
                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Submit Review')
                }
              </Button>
            </form>
          </Form>
        </div>

        {(userPresent && myReviews.length > 0) && <div>
          <h2 className="text-2xl font-bold mb-4">Your Reviews</h2>
          <div className="grid gap-6">
            {myReviews.map((review, index) => (
              <div key={`my_review_${index}`} className="flex gap-4">
                <Avatar className="w-12 h-12 border">
                  <AvatarImage src={`${review.user.picture}`} />
                  <AvatarFallback>{getFallBack(review.user)}</AvatarFallback>
                </Avatar>
                <div className="w-full flex justify-between">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{review.user.name ? review.user.name : review.user.username}</div>
                      <div className="text-xs text-muted-foreground">{review.user.name ? review.user.username : ""}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <StarIcon key={`star_${index}_${i}`} className="w-5 h-5 fill-primary" />
                        ))}
                        {Array.from({ length: 5 - review.rating }, (_, i) => (
                          <StarIcon key={`no_star_${index}_${i}`} className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(review.createdAt || new Date()), { addSuffix: true })}</div>
                    </div>
                    <div className="text-sm leading-loose text-muted-foreground">
                      {review.review}
                    </div>
                  </div>
                  
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <TrashIcon className="w-5 h-5" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete your review</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action can&apos;t be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button type="button" className={`justify-self-end cursor-pointer bg-blue-700 hover:bg-blue-800`} disabled={isSubmitting} onClick={() => onDelete(review._id as string)}>
                          {
                            isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Delete')
                          }
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

              </div>
            ))}
          </div>
          
          { lastMyReviews === increment &&
            <p onClick={async () => {
              
            
              try {
                const response = await axios.get(`/api/get-reviews/${bookId}?page=${myReviewsPage + 1}&increment=${increment}&userId=${user?._id || ""}&notAllowedUserId=false`);
                if(response.status === 200) {
                  const reviews = response.data.response;
                  setMyReviews((prev) => [...prev, ...reviews]);
                  setLastMyReviews(reviews.length);
                } else {
                  console.log("Wrong input");
                }
              } catch (error: any) {
                console.log(error.message);
              }

              setMyReviewsPage((prev) => prev + 1);
              
            }} className="mt-4 px-4 py-2 cursor-pointer text-blue-600 underline transform duration-300 underline-offset-2">
              See More
            </p>
          }

        </div>}

        <div>
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="grid gap-6">
            {otherReviews.map((review, index) => (
              <div key={`other_review_${index}`} className="flex gap-4">
                <Avatar className="w-12 h-12 border">
                  <AvatarImage src={`${review.user.picture}`} />
                  <AvatarFallback>{getFallBack(review.user)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{review.user.name ? review.user.name : review.user.username}</div>
                    <div className="text-xs text-muted-foreground">{review.user.name ? review.user.username : ""}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <StarIcon key={`star_${index}_${i}`} className="w-5 h-5 fill-primary" />
                      ))}
                      {Array.from({ length: 5 - review.rating }, (_, i) => (
                        <StarIcon key={`no_star_${index}_${i}`} className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(review.createdAt || new Date()), { addSuffix: true })}</div>
                  </div>
                  <div className="text-sm leading-loose text-muted-foreground">
                    {review.review}
                  </div>
                </div>
              </div>
            ))}
            {otherReviews.length === 0 && <div className="flex gap-4">No reviews submitted yet</div>}
          </div>
        
          { lastOtherReviews === increment &&
            <p onClick={async () => {
              try {
                const response = await axios.get(`/api/get-reviews/${bookId}?page=${otherReviewsPage + 1}&increment=${increment}&userId=${user?._id || ""}&notAllowedUserId=true`);
                if(response.status === 200) {
                  const reviews = response.data.response;
                  setOtherReviews((prev) => [...prev, ...reviews]);
                  setLastOtherReviews(reviews.length);
                } else {
                  console.log("Wrong input");
                }
              } catch (error: any) {
                console.log(error.message);
              }

              setOtherReviewsPage((prev) => prev + 1);
            }} className="mt-4 px-4 py-2 cursor-pointer text-blue-600 underline transform duration-300 underline-offset-2">
              See More
            </p>
          }
        
        </div>
      </div>
    </div>
  )
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}